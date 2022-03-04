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

export interface FilterConfig {
    readonly type?: FilterTypeID;
    readonly cutoff?: number;
    readonly resonance?: number;
}

export const createFilterData = (config: FilterConfig = {}): FilterData => {
    return {
        type: config.type ?? 'LOWPASS',
        cutoff: config.cutoff ?? FREQUENCY_MAX,
        resonance: config.resonance ?? 1,
    };
};
