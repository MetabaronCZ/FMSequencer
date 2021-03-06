import { fillArray } from 'core/array';

import { TRACK_COUNT } from 'modules/engine/config';
import { SEQUENCE_COUNT } from 'modules/project/config';
import {
  MasterConfig,
  MasterData,
  createMasterData,
} from 'modules/project/master';
import {
  SequenceConfig,
  SequenceData,
  createSequenceData,
} from 'modules/project/sequence';
import { SongConfig, SongData, createSongData } from 'modules/project/song';
import { TrackConfig, TrackData, createTrackData } from 'modules/project/track';

export interface ProjectData {
  readonly name: string;
  readonly tempo: number;
  readonly master: MasterData;
  readonly tracks: TrackData[];
  readonly sequences: SequenceData[];
  readonly song: SongData;
}

export interface ProjectConfig {
  readonly name?: string;
  readonly tempo?: number;
  readonly master?: MasterConfig;
  readonly tracks?: TrackConfig[];
  readonly sequences?: SequenceConfig[];
  readonly song?: SongConfig;
}

export const createProjectData = (config: ProjectConfig = {}): ProjectData => {
  const tracks = config.tracks ?? [];
  const seqs = config.sequences ?? [];
  return {
    name: config.name ?? 'New project',
    tempo: config.tempo ?? 130,
    master: createMasterData(config.master),
    tracks: fillArray(TRACK_COUNT, (i) => createTrackData(i, tracks[i])),
    sequences: fillArray(SEQUENCE_COUNT, (i) => createSequenceData(i, seqs[i])),
    song: createSongData(config.song),
  };
};
