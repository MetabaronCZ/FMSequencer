import { OPERATOR_COUNT } from 'modules/audio/config';
import { createFilter, Filter, FilterConfig } from 'modules/audio/instrument/filter';
import { createOperator, Operator, OperatorConfig } from 'modules/audio/instrument/operator';

const emptyOperators: OperatorConfig[] = Array(OPERATOR_COUNT).fill({});

export interface Instrument {
    readonly level: number;
    readonly pan: number;
    readonly algorithm: number;
    readonly operators: Operator[];
    readonly filter: Filter;
}
const defaults: Instrument = {
    level: 1,
    pan: 0,
    algorithm: 1,
    operators: emptyOperators.map(() => createOperator()),
    filter: createFilter(),
};

export interface InstrumentConfig {
    readonly level?: number;
    readonly pan?: number;
    readonly algorithm?: number;
    readonly operators?: OperatorConfig[];
    readonly filter?: FilterConfig;
}

export const createInstrument = (config: InstrumentConfig = {}): Instrument => {
    const operators = config.operators || emptyOperators;
    return {
        ...Object.assign({}, defaults, config),
        operators: operators.map((op) => createOperator(op)),
        filter: createFilter(config.filter),
    };
};
