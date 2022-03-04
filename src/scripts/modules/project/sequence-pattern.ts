export interface SequencePatternData {
    readonly pattern: number;
    readonly bar: number; // starting bar for given pattern
}

export interface SequencePatternConfig {
    readonly pattern?: number;
    readonly bar?: number;
}

export const createSequencePatternData = (config: SequencePatternConfig = {}): SequencePatternData => {
    return {
        pattern: config.pattern ?? 0,
        bar: config.bar ?? 0,
    };
};
