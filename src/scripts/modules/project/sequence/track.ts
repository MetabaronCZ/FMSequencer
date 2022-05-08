import { getTrackName } from 'modules/project/track';

export interface SequenceTrackData {
    readonly name: string;
    readonly pattern: number;
}

export interface SequenceTrackConfig {
    readonly name?: string;
    readonly pattern?: number;
}

export const createSequenceTrackData = (seqId: number, trackId: number, config: SequenceTrackConfig = {}): SequenceTrackData => {
    return {
        name: config.name ?? getTrackName(trackId),
        pattern: config.pattern ?? seqId,
    };
};
