import logger from 'redux-logger';
import { useDispatch, useSelector } from 'react-redux';
import { configureStore, Dispatch, Middleware } from '@reduxjs/toolkit';

import { MasterActions, masterSlice } from 'store/master';
import { InstrumentActions, instrumentSlice } from 'store/instruments';

import { ENV } from 'modules/env';

const middleware: Middleware[] = [];

if (ENV.isDev) {
    middleware.push(logger);
}

export const store = configureStore({
    reducer: {
        instruments: instrumentSlice.reducer,
        master: masterSlice.reducer,
    },
    middleware,
});

export type Store = ReturnType<typeof store.getState>;

type AppActions = MasterActions | InstrumentActions;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch<AppActions> => useDispatch<AppDispatch>();

export const useAppSelector = <T>(fn: (state: Store) => T): T => useSelector<Store, T>(fn);
