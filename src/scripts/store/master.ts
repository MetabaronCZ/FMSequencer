import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'modules/core/number';

import { AudioEngine } from 'modules/engine';
import { LEVEL_MAX, LEVEL_MIN } from 'modules/audio/instrument/level';
import { createMasterData, MasterConfig } from 'modules/audio/master';

type LoadMasterAction = PayloadAction<MasterConfig>;
type SetMasterLevelAction = PayloadAction<number>;
export type MasterActions = LoadMasterAction | SetMasterLevelAction;

export const masterSlice = createSlice({
    name: 'master',
    initialState: () => {
        const state = createMasterData();

        const time = AudioEngine.getTime();
        AudioEngine.master.set(state, time);

        return state;
    },
    reducers: {
        create: (state, action: LoadMasterAction) => {
            const newState = createMasterData(action.payload);

            const time = AudioEngine.getTime();
            AudioEngine.master.set(newState, time);

            return newState;
        },
        setLevel: (state, action: SetMasterLevelAction) => {
            const value = limitNumber(action.payload, LEVEL_MIN, LEVEL_MAX);
            state.level = value;

            const time = AudioEngine.getTime();
            AudioEngine.master.level.set(value, time);
        },
    },
});
