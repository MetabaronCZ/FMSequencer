export interface SongSequenceData {
  readonly sequence: number;
  readonly repeat: number;
}

export interface SongSequenceConfig {
  readonly sequence?: number;
  readonly repeat?: number;
}

export const createSongSequenceData = (
  config: SongSequenceConfig = {}
): SongSequenceData => {
  return {
    sequence: config.sequence ?? 0,
    repeat: config.repeat ?? 1,
  };
};
