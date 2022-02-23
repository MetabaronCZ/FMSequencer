import { PayloadAction } from '@reduxjs/toolkit';

import { ProjectReducer } from 'store/project';

import { LEVEL_MAX, LEVEL_MIN } from 'modules/engine/config';
import { limitNumber } from 'modules/core/number';
import { AudioEngine } from 'modules/engine';

type SetMasterLevelAction = PayloadAction<number>;
export type MasterActions = SetMasterLevelAction;

const setMasterLevel: ProjectReducer<SetMasterLevelAction> = (state, action) => {
    const value = limitNumber(action.payload, LEVEL_MIN, LEVEL_MAX);
    state.master.level = value;

    const time = AudioEngine.getTime();
    AudioEngine.master.level.set(value, time);
};

export const masterReducer = {
    setMasterLevel,
};
