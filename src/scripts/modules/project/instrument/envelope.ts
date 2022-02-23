import { ENVELOPE_SUSTAIN_MAX } from 'modules/engine/config';

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
