export const PROJECT_NAME_LENGTH = 16;
export const TEMPO_MIN = 40;
export const TEMPO_MAX = 300;

export const PATTERN_COUNT = 128;
export const PATTERN_LENGTH_MIN = 1;
export const PATTERN_LENGTH_MAX = 16;

export const patternDivisions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] as const;
export type PatternDivisionID = typeof patternDivisions[number];

export const stepFXIDs = [0, 1, 2] as const;
export type StepFXID = typeof stepFXIDs[number];

export const stepFXTypes = ['???'] as const;
export type StepFXType = typeof stepFXTypes[number];

export const STEP_FX_VALUE_MIN = 1;
export const STEP_FX_VALUE_MAX = 128;

export const SEQUENCE_COUNT = 128;
export const SEQUENCE_LENGTH_MIN = 1;
export const SEQUENCE_LENGTH_MAX = 16;
export const SEQUENCE_REPEAT_MIN = 1;
export const SEQUENCE_REPEAT_MAX = 100;

export const SONG_LENGTH_MAX = 999;
