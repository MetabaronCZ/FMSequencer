import { TRACK_COUNT } from 'modules/engine/config';
import { createSongData, SongConfig, SongData } from 'modules/project/song';
import { createTrackData, TrackConfig, TrackData } from 'modules/project/track';
import { createMasterData, MasterConfig, MasterData } from 'modules/project/master';
import { createSequenceData, SequenceConfig, SequenceData } from 'modules/project/sequence';

export interface ProjectData {
    readonly name: string;
    readonly description: string;
    readonly tempo: number;
    readonly master: MasterData;
    readonly tracks: TrackData[];
    readonly sequences: SequenceData[];
    readonly song: SongData;
}
const defaults: ProjectData = {
    name: 'New Project',
    description: '',
    tempo: 130,
    master: createMasterData(),
    tracks: [],
    sequences: [
        createSequenceData(),
    ],
    song: createSongData(),
};

export interface ProjectConfig {
    readonly name?: string;
    readonly description?: string;
    readonly tempo?: number;
    readonly master?: MasterConfig;
    readonly tracks?: TrackConfig[];
    readonly sequences?: SequenceConfig[];
    readonly song?: SongConfig;
}

export const createProjectData = (config: ProjectConfig = {}): ProjectData => {
    const tracks = config.tracks || [];
    return {
        ...Object.assign({}, defaults, config),
        master: createMasterData(config.master),
        tracks: Array(TRACK_COUNT).fill(0).map((item, i) => createTrackData(i, tracks[i])),
        sequences: config.sequences
            ? config.sequences.map((item) => createSequenceData(item))
            : defaults.sequences,
        song: createSongData(config.song),
    };
};
