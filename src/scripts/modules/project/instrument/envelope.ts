import { ENVELOPE_SUSTAIN_MAX } from 'modules/engine/config';

export interface EnvelopeData {
    readonly attack: number;
    readonly decay: number;
    readonly sustain: number;
    readonly release: number;
}

export interface EnvelopeConfig {
    readonly attack?: number;
    readonly decay?: number;
    readonly sustain?: number;
    readonly release?: number;
}

export const createEnvelopeData = (config: EnvelopeConfig = {}): EnvelopeData => {
    return {
        attack: config.attack ?? 0.01,
        decay: config.decay ?? 0.1,
        sustain: config.sustain ?? ENVELOPE_SUSTAIN_MAX,
        release: config.release ?? 0.5,
    };
};
