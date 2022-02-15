import { OPERATOR_COUNT } from 'modules/audio/config';
import { LEVEL_MAX } from 'modules/audio/instrument/level';
import { AlgorithmID } from 'modules/audio/instrument/algorithm';
import { createFilterData, FilterData, FilterConfig } from 'modules/audio/instrument/filter';
import { createOperatorData, OperatorData, OperatorConfig } from 'modules/audio/instrument/operator';

export const INSTRUMENT_COUNT = 8;
export const INSTRUMENT_NAME_LENGTH = 16;

const emptyOperators: OperatorConfig[] = Array(OPERATOR_COUNT).fill({});

export interface InstrumentData {
    readonly name: string;
    readonly level: number;
    readonly pan: number;
    readonly algorithm: AlgorithmID;
    readonly operators: OperatorData[];
    readonly filter: FilterData;
}
const defaults: InstrumentData = {
    name: 'Instrument',
    level: LEVEL_MAX,
    pan: 0,
    algorithm: 1,
    operators: emptyOperators.map(() => createOperatorData()),
    filter: createFilterData(),
};

export interface InstrumentConfig {
    readonly name?: string;
    readonly level?: number;
    readonly pan?: number;
    readonly algorithm?: AlgorithmID;
    readonly operators?: OperatorConfig[];
    readonly filter?: FilterConfig;
}

export const createInstrumentData = (config: InstrumentConfig = {}): InstrumentData => {
    const operators = config.operators || emptyOperators;
    return {
        ...Object.assign({}, defaults, config),
        operators: operators.map((op) => createOperatorData(op)),
        filter: createFilterData(config.filter),
    };
};
