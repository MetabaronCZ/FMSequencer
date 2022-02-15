import { LEVEL_MAX } from 'modules/audio/instrument/level';

export interface MasterData {
    readonly level: number;
}
const defaults: MasterData = {
    level: LEVEL_MAX,
};

export interface MasterConfig {
    readonly level?: number;
}

export const createMasterData = (config: MasterConfig = {}): MasterData => {
    return Object.assign({}, defaults, config);
};
