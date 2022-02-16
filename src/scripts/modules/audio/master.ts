export interface MasterData {
    readonly level: number;
}
const defaults: MasterData = {
    level: 10,
};

export interface MasterConfig {
    readonly level?: number;
}

export const createMasterData = (config: MasterConfig = {}): MasterData => {
    return Object.assign({}, defaults, config);
};
