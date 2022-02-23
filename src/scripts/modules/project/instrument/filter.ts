import { FilterTypeID, FREQUENCY_MAX } from 'modules/engine/config';

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
