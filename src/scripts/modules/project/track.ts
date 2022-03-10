import { createPatternData, PatternConfig, PatternData } from 'modules/project/pattern';
import { createInstrumentData, InstrumentConfig, InstrumentData } from 'modules/project/instrument';

export interface TrackData {
    readonly name: string;
    readonly patterns: PatternData[];
    readonly instrument: InstrumentData;
}

export interface TrackConfig {
    readonly name?: string;
    readonly patterns?: PatternConfig[];
    readonly instrument?: InstrumentConfig;
}

export const createTrackData = (id: number, config: TrackConfig = {}): TrackData => {
    const patterns = config.patterns ?? [{}];
    return {
        name: config.name ?? `Track ${id + 1}`,
        patterns: patterns.map((item) => createPatternData(item)),
        instrument: createInstrumentData(id, config.instrument),
    };
};
