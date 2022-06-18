import {
  SongSequenceConfig,
  SongSequenceData,
  createSongSequenceData,
} from 'modules/project/song/sequence';

export interface SongData {
  readonly sequences: SongSequenceData[];
}

export interface SongConfig {
  readonly sequences?: SongSequenceConfig[];
}

export const createSongData = (config: SongConfig = {}): SongData => {
  const sequences = config.sequences ?? [{}];
  return {
    sequences: sequences.map((item) => createSongSequenceData(item)),
  };
};
