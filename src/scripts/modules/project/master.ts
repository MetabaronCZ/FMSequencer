export interface Master {
    readonly volume: number;
}
const defaults: Master = {
    volume: 1,
};

export interface MasterConfig {
    readonly volume?: number;
}

export const createMaster = (config: MasterConfig = {}): Master => {
    return Object.assign({}, defaults, config);
};
