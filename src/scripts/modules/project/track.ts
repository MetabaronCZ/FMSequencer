import { createPatternData, PatternConfig, PatternData } from 'modules/project/pattern';
import { createInstrumentData, InstrumentConfig, InstrumentData } from 'modules/project/instrument';

export interface TrackData {
    readonly patterns: PatternData[];
    readonly instrument: InstrumentData;
}

export interface TrackConfig {
    readonly patterns?: PatternConfig[];
    readonly instrument?: InstrumentConfig;
}

export const createTrackData = (id: number, config: TrackConfig = {}): TrackData => {
    const patterns = config.patterns || [{}];
    return {
        patterns: patterns.map((item) => createPatternData(item)),
        instrument: createInstrumentData(id, config.instrument),
    };
};
