import {Tone} from '../'

// notice that we're only importing half of the snare,
// the white noise half,
// for that retro 8-bit 
//   "we don't have a / can't use the wavetable channel
//   and certainly don't have FM synthesis
//   so our drums are just volume-enveloped white noise :/"
// aesthetic

import {bass, kick, snareNoise, pad, square} from '../instruments'

import {chromaticETScale} from '../tuning'

// I think I'll go with the familiar 12-TET for the title screen,
// and then go nonstandard to induce discomfort only once the game's started. :)
// ooh, and maybe i'll do an odd time signature too! 4/4 here though
const key = 'C3'

const scale = chromaticETScale(1, 12, 2)

const loopLength = '4m'
const titleBPM = 86

function kickAndSnare(time) {
  const kickFreq = 'C2'; // necessary semicolons ;(

  [time, `${time} + 2n`]
    .forEach(onBeat => kick.triggerAttackRelease(kickFreq, '8n', onBeat));

  [`${time} + 4n`, `${time} + 2n + 4n`]
  
    .forEach(offBeat => snareNoise.triggerAttackRelease('8n', offBeat))
}

function bassMeasure(time, rootNote=key) {
  const rootOctave = Math.random() > .5 ? 1 : 2
  bass.triggerAttackRelease(`${rootNote} / ${rootOctave}`, '4n', time);

  [`${time} + 4n`, `${time} + 2n`, `${time} + 2n + 4n`]
    .forEach(beat => {
      // using empty array slots as shorthand for "no change"
      const ratioToRoot = [.5, scale[2]/2, scale[5], scale[5]/2, scale[7], scale[7]/2, scale[10],,,,,][Math.random()*10|0]
      const syncopation = ['+8t', '-8t', '+8n','-8n',,,,,,][Math.random()*10|0]
      bass.triggerAttackRelease(`${rootNote} * ${ratioToRoot||1}`, '4n', `${time} ${syncopation||''}`)
    })
}

function padMeasure(time, rootNote=key) {
  pad.triggerAttackRelease(`${rootNote}`, '1m', time, Math.random())
  pad.triggerAttackRelease(`${rootNote} * ${scale[4]}`, '1m', time, Math.random() * .7)
  pad.triggerAttackRelease(`${rootNote} * ${scale[7]}`, '1m', time, Math.random() * .9)
  if (Math.random() < .3) 
    pad.triggerAttackRelease(`${rootNote} * ${scale[10]}`, '1m', time, Math.random() * .4)
}

function arpMeasure(time, rootNote=key) {
  [`${time} + 8n`, `${time} + 4n + 8n`, `${time} + 2n + 8n`, `${time} + 2n + 4n + 8n`]
    .forEach((offBeat, i) => {
      square.triggerAttackRelease(rootNote, '16n', offBeat, Math.random())
      square.triggerAttackRelease(`${rootNote} * ${scale[4]}`, '16n', `${offBeat} + 16n`, Math.random())
      square.triggerAttackRelease(`${rootNote} * ${scale[7]}`, '16n', `${offBeat} + 8n`, Math.random())
    })
}

function melodicInstruments(time, rootNote) {
  bassMeasure(time, rootNote)
  padMeasure(time, `${rootNote} * 2`)
  arpMeasure(time, `${rootNote} * 2`)
}

const titleMusic = new Tone.Loop(time => {
  [time, `${time} + 1m`, `${time} + 2m`, `${time} + 3m`]
    .forEach((measure, i) => {
      kickAndSnare(measure)
      const chordRoot = [1, 1, scale[5], scale[7]][i]
      melodicInstruments(measure, `${key} * ${chordRoot}`)
    });
  
}, loopLength)

export function playTitleMusic() {
  Tone.Master.mute = false
  Tone.Transport.stop()
  Tone.Transport.cancel()
  Tone.Transport.position = 0
  Tone.Transport.timeSignature = 4
  Tone.Transport.swing = .2
  Tone.Transport.bpm.value = titleBPM
  Tone.Transport.bpm.rampTo(titleBPM, 0.01) // setting it directly doesn't seem to work?
  Tone.Transport.loop = true
  Tone.Transport.loopEnd = loopLength

  titleMusic.mute = false
  titleMusic.start('1m').stop(loopLength)
  Tone.Transport.start()
}

export function stopTitleMusic() {
  Tone.Transport.stop()
  Tone.Transport.cancel(-Infinity)
  titleMusic.stop()
  titleMusic.cancel(-Infinity)
  titleMusic.mute = true
  // titleMusic.dispose() // I'm just trying everything I can
}
