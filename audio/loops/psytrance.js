// lots of room for refactoring.

import { Tone } from '../'
import { bass, kick, snareHit, snareNoise, hihat, guitar1, guitar2, pad } from '../instruments'


const startBpm = 70
const loopLength = '4m'

const bassLoop = new Tone.Loop(function (time) {
  const root = 'C3'
  let notes = [].concat(
    Array(20).fill(root),
    Array(4).fill(root + '* 4/3'), // up to IV
    Array(4).fill(root + '* 2/3'), // down to IV
    // 1.05946309436 is 2**(1/12)
    [root + '* 1.05946309436', root + '* 1.05946309436 / 2', root + '* 1.189207115'] // off notes
  )
  let note = notes[Math.random() * notes.length | 0]
  bass.triggerAttackRelease(note, '8n', time)
  if (Math.random() > 0.8) bass.triggerAttackRelease('C2', '8n', time + '+16n')
}, '8n')

const drumLoop = new Tone.Loop(time => {
  kick.triggerAttackRelease('C2', '8n')
  snareHit.triggerAttackRelease('G2', '8n', time + '+4n', 0.5)
  snareNoise.triggerAttackRelease('8n', time, 1) //duration, time, velocity
}, '2n')

const hatLoop = new Tone.Loop(time => {
  hihat.triggerAttackRelease('16n', time)
  hihat.triggerAttackRelease('16n', time + '+16n', 0.2)
  hihat.triggerAttackRelease('4n', time + '+8n', 0.5)
  hihat.triggerAttackRelease('16n', time + '+8n+16n', 0.2)
}, '4n')

const guitarLoop = new Tone.Loop(time => {
  const root = 'C4'

  let notes = [].concat(
    Array(20).fill(root),
    Array(4).fill(root + '* 4/3'), // up to IV
    Array(4).fill(root + '* 2/3'), // down to IV
    // 1.05946309436 is 2**(1/12)
    [root + '* 1.05946309436', root + '* 1.05946309436 / 2', root + '* 1.189207115'] // off notes
  )
  let note = notes[Math.random() * notes.length | 0]
  guitar1.triggerAttackRelease(note, '8n', time, Math.random())
  guitar2.triggerAttackRelease(note, '8n', time, Math.random())
  if (Math.random() > 0.666) {
    guitar1.triggerAttackRelease('C5', '16n', time + '+16n/2', Math.random())
    guitar2.triggerAttackRelease('C5', '16n', time + '+16n/2', Math.random())
  }
}, '8n')

const padLoop = new Tone.Loop(time => {
  const root = 'C3'
  pad.triggerAttackRelease(root, '1m', time, Math.random())
  pad.triggerAttackRelease(root + '* 4/3', '1m', time, Math.random())
  pad.triggerAttackRelease(root + '* 8/9', '1m', time, Math.random())
})

// bassLoop.start('1m').stop('4m')
// drumLoop.start('1m').stop('4m')
export function addHat() {
  hatLoop.mute = false
}

export function stopHat() {
  hatLoop.mute = true
}

export function addGuitar() {
  guitarLoop.mute = false
}

export function beginPsytrance() {
  Tone.Transport.stop()
  Tone.Transport.cancel(-1)
  Tone.Transport.bpm.value = startBpm
  Tone.Transport.timeSignature = 4
  Tone.Transport.swing = 0.1
  Tone.Transport.loop = true
  Tone.Transport.loopEnd = loopLength; // necessary semicolon
  [bassLoop, drumLoop, padLoop, guitarLoop, hatLoop]
    .forEach(subloop => {
      subloop.start(0).stop(loopLength)
      subloop.mute = false
    })
  hatLoop.mute = true
  guitarLoop.mute = true
  Tone.Transport.start()
}

export function stopPsytrance() {
  Tone.Transport.stop()
  [bassLoop, hatLoop, drumLoop, padLoop, hatLoop]
    .forEach(subloop => {
      subloop.stop()
      subloop.cancel()
      subloop.mute = true
    })
  // how do you stop this loop?!!?
}