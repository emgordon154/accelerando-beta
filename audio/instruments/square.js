import {Tone} from '../'

import reverb from '../bus/reverb'

const reverbGain = new Tone.Volume(-12).connect(reverb)
const gain = new Tone.Volume(-12).toMaster().connect(reverbGain)

// const filter = new Tone.AutoFilter(1, 200, 3).connect(gain)

const filter = new Tone.Filter({
  type: 'lowpass',
  frequency: 16000,
  rolloff: -48,
  Q: 1.4
}).connect(gain)

const square = new Tone.Synth({
	oscillator: {
		type: 'pwm',
		modulationFrequency: 0.6
	},
	envelope: {
		attack: 0.02,
		decay: 0.1,
		sustain: 0.2,
		release: 0.9,
	}
}).connect(filter)

export default square
