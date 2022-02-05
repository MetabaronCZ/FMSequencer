import { Pattern } from 'modules/project/pattern';
import { Instrument } from 'modules/audio/instrument';

export interface Track {
    readonly instrument: Instrument;
    readonly patterns: Pattern[];
    readonly voiceCont: number;
}
