// decided not to use this for now

import {default as Tone} from 'Tone'

const basskickComp = new Tone.Volume().toMaster()

// const basskickComp = new Tone.Compressor({
//   ratio: 10,
//   threshold: -24,
//   attack: 0.003,
//   release: 0.01,
//   knee: 0
// }).toMaster()

export default basskickComp
