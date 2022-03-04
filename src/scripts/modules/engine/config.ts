// general
export const SAMPLE_RATE = 44100;
export const TRACK_COUNT = 8;

// note / velocity
export const VELOCITY_MIN = 0;
export const VELOCITY_MAX = 100;
export const PITCH_BASE = 72;

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
const arr1 = Array(126).fill(0).map((val, i) => `1/${i + 2}`).reverse();
const arr2 = Array(32).fill(0).map((val, i) => `${i + 1}`);

export const ratios = [...arr1.concat(arr2)] as const;
export type RatioID = typeof ratios[number];

// level
export const LEVEL_MIN = 0;
export const LEVEL_MAX = 100;

// pan
export const PAN_MIN = -50;
export const PAN_MAX = +50;

// filter
export const filterTypes = ['LOWPASS', 'HIGHPASS', 'BANDPASS'] as const;
export type FilterTypeID = typeof filterTypes[number];

export const RESONANCE_MIN = 0.01;
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