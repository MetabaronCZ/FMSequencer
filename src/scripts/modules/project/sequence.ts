import { TRACK_COUNT } from 'modules/engine/config';
import { createSequenceTrackData, SequenceTrackConfig, SequenceTrackData } from 'modules/project/sequence-track';

export interface SequenceData {
    readonly bars: number; // length in bars
    readonly tracks: SequenceTrackData[];
}

const defaults: SequenceData = {
    bars: 1,
    tracks: [],
};

export interface SequenceConfig {
    readonly bars?: number;
    readonly tracks?: SequenceTrackConfig[];
}

export const createSequenceData = (config: SequenceConfig = {}): SequenceData => {
    const tracks = config.tracks || [];
    return {
        ...Object.assign({}, defaults, config),
        tracks: Array(TRACK_COUNT).fill(0).map((item, i) => createSequenceTrackData(tracks[i])),
    };
};
