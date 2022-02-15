export const ENVELOPE_ATTACK_MIN = 0;
export const ENVELOPE_ATTACK_MAX = 10;

export const ENVELOPE_DECAY_MIN = 0;
export const ENVELOPE_DECAY_MAX = 10;

export const ENVELOPE_SUSTAIN_MIN = 0;
export const ENVELOPE_SUSTAIN_MAX = 100;

export const ENVELOPE_RELEASE_MIN = 0;
export const ENVELOPE_RELEASE_MAX = 10;

export interface EnvelopeData {
    readonly attack: number;
    readonly decay: number;
    readonly sustain: number;
    readonly release: number;
}
const defaults: EnvelopeData = {
    attack: 0.01,
    decay: 0.1,
    sustain: ENVELOPE_SUSTAIN_MAX,
    release: 0.5,
};

export interface EnvelopeConfig {
    readonly attack?: number;
    readonly decay?: number;
    readonly sustain?: number;
    readonly release?: number;
}

export const createEnvelopeData = (config: EnvelopeConfig = {}): EnvelopeData => {
    return Object.assign({}, defaults, config);
};
