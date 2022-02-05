import { SAMPLE_RATE } from 'modules/audio/config';

export const FILTER_CUTOFF_MIN = 0;
export const FILTER_CUTOFF_MAX = SAMPLE_RATE / 2;
export const FILTER_RESONANCE_MIN = 0;
export const FILTER_RESONANCE_MAX = 1000;

export interface Filter {
    readonly type: BiquadFilterType;
    readonly cutoff: number;
    readonly resonance: number;
}
const defaults: Filter = {
    type: 'lowpass',
    cutoff: FILTER_CUTOFF_MAX,
    resonance: 1,
};

export interface FilterConfig {
    readonly type?: BiquadFilterType;
    readonly cutoff?: number;
    readonly resonance?: number;
}

export const createFilter = (config: FilterConfig = {}): Filter => {
    return Object.assign({}, defaults, config);
};
