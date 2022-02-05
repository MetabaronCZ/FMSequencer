import { createEnvelope, Envelope, EnvelopeConfig } from 'modules/audio/instrument/envelope';

export interface Operator {
    readonly type: OscillatorType;
    readonly level: number;
    readonly ratio: number;
    readonly envelope: Envelope;
}
const defaults: Operator = {
    type: 'sine',
    level: 1,
    ratio: 1,
    envelope: createEnvelope(),
};

export interface OperatorConfig {
    readonly type?: OscillatorType;
    readonly level?: number;
    readonly ratio?: number;
    readonly envelope?: EnvelopeConfig;
}

export const createOperator = (config: OperatorConfig = {}) : Operator => ({
    ...Object.assign({}, defaults, config),
    envelope: createEnvelope(config.envelope),
});
