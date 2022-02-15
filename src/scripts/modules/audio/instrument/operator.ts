import { LEVEL_MAX } from 'modules/audio/instrument/level';
import { OscillatorTypeID } from 'modules/audio/instrument/oscillator';
import { createEnvelopeData, EnvelopeData, EnvelopeConfig } from 'modules/audio/instrument/envelope';

export interface OperatorData {
    readonly type: OscillatorTypeID;
    readonly level: number;
    readonly ratio: number;
    readonly envelope: EnvelopeData;
}
const defaults: OperatorData = {
    type: 'SIN',
    level: LEVEL_MAX,
    ratio: 1,
    envelope: createEnvelopeData(),
};

export interface OperatorConfig {
    readonly type?: OscillatorTypeID;
    readonly level?: number;
    readonly ratio?: number;
    readonly envelope?: EnvelopeConfig;
}

export const createOperatorData = (config: OperatorConfig = {}) : OperatorData => ({
    ...Object.assign({}, defaults, config),
    envelope: createEnvelopeData(config.envelope),
});
