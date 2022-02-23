export interface SongSequenceData {
    readonly sequence: number;
    readonly repeat: number;
}
const defaults: SongSequenceData = {
    sequence: 0,
    repeat: 1,
};

export interface SongSequenceConfig {
    readonly sequence?: number;
    readonly repeat?: number;
}

export const createSongSequenceData = (config: SongSequenceConfig = {}): SongSequenceData => {
    return Object.assign({}, defaults, config);
};
