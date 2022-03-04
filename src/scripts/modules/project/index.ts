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
    const tracks = config.tracks ?? [];
    const seqs = config.sequences ?? [{}];
    return {
        name: config.name ?? 'New Project',
        description: config.description ?? '',
        tempo: config.tempo ?? 130,
        master: createMasterData(config.master),
        tracks: Array(TRACK_COUNT).fill(0).map((item, i) => createTrackData(i, tracks[i])),
        sequences: seqs.map((item) => createSequenceData(item)),
        song: createSongData(config.song),
    };
};
