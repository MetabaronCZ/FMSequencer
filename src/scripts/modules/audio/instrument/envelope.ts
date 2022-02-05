export interface Envelope {
    readonly attack: number;
    readonly decay: number;
    readonly sustain: number;
    readonly release: number;
}
const defaults: Envelope = {
    attack: 0.01,
    decay: 0.1,
    sustain: 1.0,
    release: 0.5,
};

export interface EnvelopeConfig {
    readonly attack?: number;
    readonly decay?: number;
    readonly sustain?: number;
    readonly release?: number;
}

export const createEnvelope = (config: EnvelopeConfig = {}): Envelope => {
    return Object.assign({}, defaults, config);
};
