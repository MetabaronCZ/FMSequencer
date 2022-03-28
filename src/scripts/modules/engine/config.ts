import { fillArray } from 'core/array';

// general
export const SAMPLE_RATE = 44100;
export const TRACK_COUNT = 8;

// pitch / velocity
export const VELOCITY_MIN = 0;
export const VELOCITY_MAX = 100;
export const PITCH_BASE = 72;
export const PITCH_MIN = 21;
export const PITCH_MAX = 127;

// FM / algorithm
export const algorithmIds = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type AlgorithmID = typeof algorithmIds[number];

export const ALGORITHM_MIN = algorithmIds[0];
export const ALGORITHM_MAX = algorithmIds[algorithmIds.length - 1];

export const MODULATOR_LEVEL_MULTIPLIER = 3000;

// instrument
export const OPERATOR_COUNT = 4;
export const INSTRUMENT_NAME_LENGTH = 16;

// oscillator
export const oscillatorTypes = ['SIN', 'TRI', 'SAW', 'SQR'] as const;
export type OscillatorTypeID = typeof oscillatorTypes[number];

// OSC ratio
const arr1 = fillArray(127, (i) => `1/${i + 2}`).reverse();
const arr2 = fillArray(32, (i) => `${i + 1}`);

export const ratios = [...arr1.concat(arr2)] as const;
export type RatioID = typeof ratios[number];

// level
export const LEVEL_MIN = 0;
export const LEVEL_MAX = 100;

// pan
export const PAN_MIN = -50;
export const PAN_MAX = +50;

// filter
export const filterTypes = ['LP', 'HP', 'BP'] as const;
export type FilterTypeID = typeof filterTypes[number];

export const RESONANCE_MIN = 0.1;
export const RESONANCE_MAX = 100;

export const FREQUENCY_BASE = 440;
export const FREQUENCY_MIN = 0;
export const FREQUENCY_MAX = SAMPLE_RATE / 2;

// envelope
export const ENVELOPE_ATTACK_MIN = 0;
export const ENVELOPE_ATTACK_MAX = 10;
export const ENVELOPE_DECAY_MIN = 0;
export const ENVELOPE_DECAY_MAX = 10;
export const ENVELOPE_SUSTAIN_MIN = 0;
export const ENVELOPE_SUSTAIN_MAX = 100;
export const ENVELOPE_RELEASE_MIN = 0;
export const ENVELOPE_RELEASE_MAX = 10;

export const FORCED_RELEASE_TIME = 0.01;
