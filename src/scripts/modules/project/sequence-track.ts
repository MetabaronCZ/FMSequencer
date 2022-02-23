import { createSequencePatternData, SequencePatternConfig, SequencePatternData } from 'modules/project/sequence-pattern';

export interface SequenceTrackData {
    readonly patterns: SequencePatternData[];
}

const defaults: SequenceTrackData = {
    patterns: [
        createSequencePatternData(),
    ],
};

export interface SequenceTrackConfig {
    readonly patterns?: SequencePatternConfig[];
}

export const createSequenceTrackData = (config: SequenceTrackConfig = {}): SequenceTrackData => {
    return {
        ...Object.assign({}, defaults, config),
        patterns: config.patterns
            ? config.patterns.map((item) => createSequencePatternData(item))
            : defaults.patterns,
    };
};
