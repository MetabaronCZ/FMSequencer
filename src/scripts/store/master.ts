import { PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'core/number';
import { ProjectReducer } from 'store/project';

import { AudioEngine } from 'modules/engine';
import { LEVEL_MAX, LEVEL_MIN } from 'modules/engine/config';

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
