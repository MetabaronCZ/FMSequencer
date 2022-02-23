import { createSongSequenceData, SongSequenceConfig, SongSequenceData } from 'modules/project/song-sequence';

export interface SongData {
    readonly sequences: SongSequenceData[];
}
const defaults: SongData = {
    sequences: [
        createSongSequenceData(),
    ],
};

export interface SongConfig {
    readonly sequences?: SongSequenceConfig[];
}

export const createSongData = (config: SongConfig = {}): SongData => {
    return {
        ...Object.assign({}, defaults, config),
        sequences: config.sequences
            ? config.sequences.map((item) => createSongSequenceData(item))
            : defaults.sequences,
    };
};
