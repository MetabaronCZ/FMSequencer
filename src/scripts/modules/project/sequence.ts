import { TRACK_COUNT } from 'modules/engine/config';
import { createSequenceTrackData, SequenceTrackConfig, SequenceTrackData } from 'modules/project/sequence-track';

export interface SequenceData {
    readonly bars: number; // length in bars
    readonly tracks: SequenceTrackData[];
}

export interface SequenceConfig {
    readonly bars?: number;
    readonly tracks?: SequenceTrackConfig[];
}

export const createSequenceData = (config: SequenceConfig = {}): SequenceData => {
    const tracks = config.tracks || [];
    return {
        bars: config.bars ?? 4,
        tracks: Array(TRACK_COUNT).fill(0).map((item, i) => createSequenceTrackData(tracks[i])),
    };
};
