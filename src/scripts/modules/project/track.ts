import { PatternData } from 'modules/project/pattern';
import { InstrumentData } from 'modules/audio/instrument';

export interface TrackData {
    readonly instrument: InstrumentData;
    readonly patterns: PatternData[];
}
