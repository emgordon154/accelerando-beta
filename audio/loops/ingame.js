
// this was a fun experiment, but i need more practice with the Bohlen-Pierce
// scale before i can really use it. psytrance.js is the actual ingame music for now



import {Tone} from '../'

import {bass, kick, snareHit, snareNoise, pad, square} from '../instruments'

import {chromaticETScale} from '../tuning'

// Hmm...can you say... odd tuning and odd time signature? :D
const key = 'G3'

const scale = chromaticETScale(1, 13, 3)

const loopLength = '4m'
const inGameBPM = 60

function kickAndSnare(time) {
  const kickFreq = 'C2'; // necessary semicolons ;(

  const onBeats = [time, `${time} + 2n`]
  const offBeats = [`${time} + 4n`, `${time} + 2n + 4n`, `${time} + 1n`]

  const beats = onBeats.concat(offBeats)

  beats
    .forEach(beat => kick.triggerAttackRelease(kickFreq, '8n', beat));

  offBeats
    .forEach(offBeat => {
      snareHit.triggerAttackRelease('G2', '8n', offBeat, 0.5)
      snareNoise.triggerAttackRelease('8n', offBeat)
    })
}

function bassMeasure(time, rootNote=key) {
  const rootOctave = Math.random() > .5 ? 1 : 2
  bass.triggerAttackRelease(`${rootNote} / ${rootOctave}`, '4n', time);

  [`${time} + 4n`, `${time} + 2n`, `${time} + 2n + 4n`, `${time} + 2n`]
    .forEach(beat => {
      // using undefined as shorthand for "no change"
      const ratioToRoot = [1/3, scale[4], scale[7], scale[7]/3, scale[10]/3][Math.random()*10|0]
      const syncopation = ['+8t', '+8n', '+4t'][Math.random()*10|0]
      bass.triggerAttackRelease(`${rootNote} * ${ratioToRoot||1}`, '4n', `${time} ${syncopation||''}`)
    })
}

function padMeasure(time, rootNote=key) {
  const vol = .6
  pad.triggerAttackRelease(`${rootNote}`, '1m', time, Math.random() * vol)
  pad.triggerAttackRelease(`${rootNote} * ${scale[4]}`, '1m', time, Math.random() * .7 * vol)
  pad.triggerAttackRelease(`${rootNote} * ${scale[7]}`, '1m', time, Math.random() * .9 * vol)
  if (Math.random() < .3) 
    pad.triggerAttackRelease(`${rootNote} * ${scale[10]}`, '1m', time, Math.random() * .4 * vol)
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
  padMeasure(time, `${rootNote} * 3`)
  arpMeasure(time, `${rootNote} * 3`)
}

const inGameMusic = new Tone.Loop(time => {
  [time, `${time} + 1m`, `${time} + 2m`, `${time} + 3m`]
    .forEach((measure, i) => {
      kickAndSnare(measure)
      const chordRoot = [1, 1, scale[4], scale[7]][i]
      melodicInstruments(measure, `${key} * ${chordRoot}`)
    });
  
}, loopLength)

export function playIngameMusic() {
  Tone.Transport.stop()
  Tone.Transport.bpm.value = inGameBPM
  Tone.Transport.timeSignature = 5
  Tone.Transport.swing = .3
  Tone.Transport.loop = true
  Tone.Transport.loopEnd = loopLength
  inGameMusic.start('1m').stop(loopLength)
  Tone.Transport.start()
}