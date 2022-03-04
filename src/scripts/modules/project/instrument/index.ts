import { AlgorithmID, LEVEL_MAX, OPERATOR_COUNT } from 'modules/engine/config';
import { createFilterData, FilterData, FilterConfig } from 'modules/project/instrument/filter';
import { createOperatorData, OperatorData, OperatorConfig } from 'modules/project/instrument/operator';

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

export const createInstrumentData = (id: number, config: InstrumentConfig = {}): InstrumentData => {
    const operators = config.operators ?? [];
    return {
        name: config.name ?? `Instrument ${id + 1}`,
        level: config.level ?? LEVEL_MAX,
        pan: config.pan ?? 0,
        algorithm: config.algorithm ?? 8,
        operators: Array(OPERATOR_COUNT).fill(0).map((item, i) => createOperatorData(operators[i])),
        filter: createFilterData(config.filter),
    };
};
