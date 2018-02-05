import {Tone} from '../'

import reverb from '../bus/reverb'

// this sounds so fucking awful but also kinda sick lmao 😎

const wetGain = new Tone.Volume(-24).connect(reverb)
const dryGain = new Tone.Volume(-6).toMaster()

// const distortion = new Tone.Chebyshev({order: 9}).connect(dryGain).connect(wetGain)

const pan = new Tone.Panner(-1).connect(dryGain).connect(wetGain)

const distortion = new Tone.Distortion({distortion: 0.6}).connect(pan)

const guitar1 = new Tone.PolySynth(4, Tone.PluckSynth).connect(distortion)

export default guitar1
