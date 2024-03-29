import { LEVEL_MAX, OscillatorTypeID, RatioID } from 'modules/engine/config';
import {
  EnvelopeConfig,
  EnvelopeData,
  createEnvelopeData,
} from 'modules/project/instrument/envelope';

export interface OperatorData {
  readonly active: boolean;
  readonly type: OscillatorTypeID;
  readonly level: number;
  readonly ratio: RatioID;
  readonly envelope: EnvelopeData;
}

export interface OperatorConfig {
  readonly active?: boolean;
  readonly type?: OscillatorTypeID;
  readonly level?: number;
  readonly ratio?: RatioID;
  readonly envelope?: EnvelopeConfig;
}

export const createOperatorData = (
  config: OperatorConfig = {}
): OperatorData => {
  return {
    active: config.active ?? true,
    type: config.type ?? 'SIN',
    level: config.level ?? LEVEL_MAX,
    ratio: config.ratio ?? '*1',
    envelope: createEnvelopeData(config.envelope),
  };
};
