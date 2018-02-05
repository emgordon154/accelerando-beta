import {default as Tone} from 'Tone'

const reverb = new Tone.JCReverb({
  roomSize: 0.7
}).toMaster()

export default reverb
