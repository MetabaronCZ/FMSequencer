import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createInstrument, InstrumentConfig } from 'modules/audio/instrument';

type LoadInstrumentAction = PayloadAction<InstrumentConfig>;
export type InstrumentActions = LoadInstrumentAction;

export const instrumentSlice = createSlice({
    name: 'instrument',
    initialState: createInstrument(),
    reducers: {
        create: (state, action: LoadInstrumentAction) => {
            return createInstrument(action.payload);
        },
    },
});
