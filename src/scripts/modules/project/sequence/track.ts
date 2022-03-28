import { createSequencePatternData, SequencePatternConfig, SequencePatternData } from 'modules/project/sequence/pattern';
import { getTrackName } from 'modules/project/track';

export interface SequenceTrackData {
    readonly name: string;
    readonly patterns: SequencePatternData[];
}

export interface SequenceTrackConfig {
    readonly name?: string;
    readonly patterns?: SequencePatternConfig[];
}

export const createSequenceTrackData = (id: number, config: SequenceTrackConfig = {}): SequenceTrackData => {
    const patterns = config.patterns ?? [{}];
    return {
        name: config.name ?? getTrackName(id),
        patterns: patterns.map((item) => createSequencePatternData(item)),
    };
};
