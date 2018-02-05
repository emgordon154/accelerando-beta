import {Tone} from '../'

import reverb from '../bus/reverb'

// this is a synthier, less out-of-tune guitar

const wetGain = new Tone.Volume(-36).connect(reverb)
const dryGain = new Tone.Volume(-18).toMaster()

// const distortion = new Tone.Chebyshev({order: 9}).connect(dryGain).connect(wetGain)

const pan = new Tone.Panner(1).connect(dryGain).connect(wetGain)

// const chorus = new Tone.Volume().connect(pan) //

// const chorus = new Tone.Chorus({
//   frequency: 1.5,
//   delayTime: 5.5,
//   depth: 0.5,
//   feedback: 0.1,
//   type: 'sine',
//   spread: 0
// }).connect(pan)

// const postfilter = new Tone.Filter(5000, 'lowpass', -24).connect(chorus)

const distortion = new Tone.Distortion({distortion: 0.5}).connect(pan)

// const prefilter = new Tone.AutoFilter({
//   frequency: 0.3,
//   baseFrequency: 400,
//   octaves: 5,
//   filter: {
//     type: 'lowpass',
//     rolloff: -24,
//     Q: 1.4
//   }
// }).connect(distortion)

const guitar2 = new Tone.PolySynth(2, Tone.MonoSynth).connect(distortion)

export default guitar2
