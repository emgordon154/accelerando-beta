import {Tone} from '../'

import basskickComp from '../bus/basskick-comp'

const kick = new Tone.MembraneSynth({}).connect(basskickComp)

export default kick
