import { FREQUENCY_MAX } from 'modules/audio/instrument/frequency';

export const RESONANCE_MIN = 0.01;
export const RESONANCE_MAX = 100;

export const filterTypes = ['LOWPASS', 'HIGHPASS', 'BANDPASS'] as const;
export type FilterTypeID = typeof filterTypes[number];

type FilterTypeData = {
    readonly [id in FilterTypeID]: BiquadFilterType;
};
const filterTypeData: FilterTypeData = {
    LOWPASS: 'lowpass',
    HIGHPASS: 'highpass',
    BANDPASS: 'bandpass',
};

export const getFilterType = (id: FilterTypeID): BiquadFilterType => {
    return filterTypeData[id];
};

export interface FilterData {
    readonly type: FilterTypeID;
    readonly cutoff: number;
    readonly resonance: number;
}
const defaults: FilterData = {
    type: 'LOWPASS',
    cutoff: FREQUENCY_MAX,
    resonance: 1,
};

export interface FilterConfig {
    readonly type?: FilterTypeID;
    readonly cutoff?: number;
    readonly resonance?: number;
}

export const createFilterData = (config: FilterConfig = {}): FilterData => {
    return Object.assign({}, defaults, config);
};
