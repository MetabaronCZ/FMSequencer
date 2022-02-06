import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createMaster, MasterConfig } from 'modules/project/master';

type LoadMasterAction = PayloadAction<MasterConfig>;
type SetVolumeAction = PayloadAction<number>;
export type MasterActions = LoadMasterAction | SetVolumeAction;

export const masterSlice = createSlice({
    name: 'master',
    initialState: createMaster(),
    reducers: {
        create: (state, action: LoadMasterAction) => {
            return createMaster(action.payload);
        },
        setVolume: (state, action: SetVolumeAction) => ({
            ...state,
            volume: action.payload,
        }),
    },
});
