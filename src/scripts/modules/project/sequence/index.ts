import { fillArray } from 'core/array';
import { toFixedLength } from 'core/format';

import { TRACK_COUNT } from 'modules/engine/config';
import {
    createSequenceTrackData, SequenceTrackConfig, SequenceTrackData,
} from 'modules/project/sequence/track';

export interface SequenceData {
    readonly name: string;
    readonly tracks: SequenceTrackData[];
    readonly bars: number; // length in bars
}

export interface SequenceConfig {
    readonly name?: string;
    readonly tracks?: SequenceTrackConfig[];
    readonly bars?: number;
}

export const createSequenceData = (id: number, config: SequenceConfig = {}): SequenceData => {
    const tracks = config.tracks ?? [];
    return {
        name: config.name ?? `Sequence ${toFixedLength(id + 1, 3, '0')}`,
        tracks: fillArray(TRACK_COUNT, (i) => createSequenceTrackData(id, i, tracks[i])),
        bars: config.bars ?? 4,
    };
};
