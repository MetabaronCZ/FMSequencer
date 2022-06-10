import { LEVEL_MAX, OscillatorTypeID, RatioID } from 'modules/engine/config';
import { createEnvelopeData, EnvelopeData, EnvelopeConfig } from 'modules/project/instrument/envelope';

export interface OperatorData {
    readonly type: OscillatorTypeID;
    readonly level: number;
    readonly ratio: RatioID;
    readonly envelope: EnvelopeData;
}

export interface OperatorConfig {
    readonly type?: OscillatorTypeID;
    readonly level?: number;
    readonly ratio?: RatioID;
    readonly envelope?: EnvelopeConfig;
}

export const createOperatorData = (config: OperatorConfig = {}) : OperatorData => {
    return {
        type: config.type ?? 'SIN',
        level: config.level ?? LEVEL_MAX,
        ratio: config.ratio ?? '1/1',
        envelope: createEnvelopeData(config.envelope),
    };
};
