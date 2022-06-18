import { fillArray } from 'core/array';
import { toFixedLength } from 'core/format';

import { AlgorithmID, LEVEL_MAX, OPERATOR_COUNT } from 'modules/engine/config';
import {
  FilterConfig,
  FilterData,
  createFilterData,
} from 'modules/project/instrument/filter';
import {
  OperatorConfig,
  OperatorData,
  createOperatorData,
} from 'modules/project/instrument/operator';

export interface InstrumentData {
  readonly name: string;
  readonly level: number;
  readonly pan: number;
  readonly algorithm: AlgorithmID;
  readonly operators: OperatorData[];
  readonly filter: FilterData;
}

export interface InstrumentConfig {
  readonly name?: string;
  readonly level?: number;
  readonly pan?: number;
  readonly algorithm?: AlgorithmID;
  readonly operators?: OperatorConfig[];
  readonly filter?: FilterConfig;
}

export const createInstrumentData = (
  id: number,
  config: InstrumentConfig = {}
): InstrumentData => {
  const operators = config.operators ?? [];
  return {
    name: config.name ?? `Instrument ${id + 1}`,
    level: config.level ?? LEVEL_MAX,
    pan: config.pan ?? 0,
    algorithm: config.algorithm ?? 8,
    operators: fillArray(OPERATOR_COUNT, (i) =>
      createOperatorData(operators[i])
    ),
    filter: createFilterData(config.filter),
  };
};

export const getPanLabel = (value: number): string => {
  const formattedValue = toFixedLength(Math.abs(value), 2, '0');
  let pan = 'C';

  if (value < 0) {
    pan = 'L';
  } else if (value > 0) {
    pan = 'R';
  }
  return `${pan}${formattedValue}`;
};
