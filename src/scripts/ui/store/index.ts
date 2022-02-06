import { useDispatch, useSelector } from 'react-redux';
import { configureStore, Dispatch } from '@reduxjs/toolkit';

import { MasterActions, masterSlice } from 'ui/store/master';
import { InstrumentActions, instrumentSlice } from 'ui/store/instrument';

export const store = configureStore({
    reducer: {
        instrument: instrumentSlice.reducer,
        master: masterSlice.reducer,
    },
});
export type Store = ReturnType<typeof store.getState>;

type AppActions = MasterActions | InstrumentActions;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch<AppActions> => useDispatch<AppDispatch>();

export const useAppSelector = <T>(fn: (state: Store) => T): T => useSelector<Store, T>(fn);
