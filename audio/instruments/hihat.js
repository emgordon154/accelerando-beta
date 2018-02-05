import {Tone} from '../'

import reverb from '../bus/reverb'

const wetGain = new Tone.Volume(-24).connect(reverb)
const dryGain = new Tone.Volume(-6).toMaster()
const hihat = new Tone.MetalSynth({ // do not use default options unless you want an auditory blast
  frequency: 270,
  envelope: {
    attack: 0.001,
    decay: 0.1,
    release: 0.5
  },
  harmonicity: 2.1, // sounds really cool at 2.1
  modulationIndex: 32,
  resonance: 4000,
  octaves: 1.5
}).connect(dryGain).connect(wetGain)

export default hihat
