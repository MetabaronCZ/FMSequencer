export interface MasterData {
    readonly level: number;
}

export interface MasterConfig {
    readonly level?: number;
}

export const createMasterData = (config: MasterConfig = {}): MasterData => {
    return {
        level: config.level ?? 10,
    };
};
