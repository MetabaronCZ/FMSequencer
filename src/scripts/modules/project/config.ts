export const PROJECT_NAME_LENGTH = 16;
export const TEMPO_MIN = 40;
export const TEMPO_MAX = 300;

export const PATTERN_COUNT = 99;
export const PATTERN_LENGTH_MIN = 1;
export const PATTERN_LENGTH_MAX = 16;

export const signatures = ['3/4', '4/4', '6/8'] as const;
export type SignatureID = typeof signatures[number];

export const stepFXIDs = [0, 1, 2] as const;
export type StepFXID = typeof stepFXIDs[number];

export const stepFXTypes = ['???'] as const;
export type StepFXType = typeof stepFXTypes[number];

export const STEP_FX_VALUE_MIN = 0;
export const STEP_FX_VALUE_MAX = 99;

export const SEQUENCE_COUNT = 99;
export const SEQUENCE_LENGTH_MIN = 1;
export const SEQUENCE_LENGTH_MAX = 16;
export const SEQUENCE_REPEAT_MIN = 1;
export const SEQUENCE_REPEAT_MAX = 8;

export const SONG_LENGTH_MAX = 99;
