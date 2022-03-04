import { createSequencePatternData, SequencePatternConfig, SequencePatternData } from 'modules/project/sequence-pattern';

export interface SequenceTrackData {
    readonly patterns: SequencePatternData[];
}

export interface SequenceTrackConfig {
    readonly patterns?: SequencePatternConfig[];
}

export const createSequenceTrackData = (config: SequenceTrackConfig = {}): SequenceTrackData => {
    const patterns = config.patterns ?? [{}];
    return {
        patterns: patterns.map((item) => createSequencePatternData(item)),
    };
};
