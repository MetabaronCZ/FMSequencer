import { fillArray } from 'core/array';

import { PATTERN_COUNT } from 'modules/project/config';
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

export const getTrackName = (id: number): string => {
    return `Track ${id + 1}`;
};

export const createTrackData = (id: number, config: TrackConfig = {}): TrackData => {
    const patterns = config.patterns ?? [];
    return {
        name: config.name ?? getTrackName(id),
        patterns: fillArray(PATTERN_COUNT, (i) => createPatternData(patterns[i])),
        instrument: createInstrumentData(id, config.instrument),
    };
};
