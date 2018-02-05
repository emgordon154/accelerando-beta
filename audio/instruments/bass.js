import {Tone} from '../'

import basskickComp from '../bus/basskick-comp'

const gain = new Tone.Volume(-1.5).connect(basskickComp)

const filter = new Tone.AutoFilter(1, 200, 3).connect(gain)

const bass = new Tone.Synth({
	oscillator: {
		type: 'pwm',
		modulationFrequency: 0.2
	},
	envelope: {
		attack: 0.02,
		decay: 0.1,
		sustain: 0.2,
		release: 0.9,
	}
}).connect(filter)

export default bass
