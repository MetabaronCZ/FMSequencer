import { LEVEL_MAX, OscillatorTypeID, RatioID } from 'modules/engine/config';
import { createEnvelopeData, EnvelopeData, EnvelopeConfig } from 'modules/project/instrument/envelope';

export interface OperatorData {
    readonly type: OscillatorTypeID;
    readonly level: number;
    readonly ratio: RatioID;
    readonly envelope: EnvelopeData;
}
const defaults: OperatorData = {
    type: 'SIN',
    level: LEVEL_MAX,
    ratio: '1',
    envelope: createEnvelopeData(),
};

export interface OperatorConfig {
    readonly type?: OscillatorTypeID;
    readonly level?: number;
    readonly ratio?: RatioID;
    readonly envelope?: EnvelopeConfig;
}

export const createOperatorData = (config: OperatorConfig = {}) : OperatorData => {
    return {
        ...Object.assign({}, defaults, config),
        envelope: config.envelope
            ? createEnvelopeData(config.envelope)
            : defaults.envelope,
    };
};
