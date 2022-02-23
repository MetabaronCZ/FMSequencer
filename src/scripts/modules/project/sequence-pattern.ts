export interface SequencePatternData {
    readonly pattern: number;
    readonly bar: number; // starting bar for given pattern
}
const defaults: SequencePatternData = {
    pattern: 0,
    bar: 0,
};

export interface SequencePatternConfig {
    readonly pattern?: number;
    readonly bar?: number;
}

export const createSequencePatternData = (config: SequencePatternConfig = {}): SequencePatternData => {
    return Object.assign({}, defaults, config);
};
