import { Dispatch, Middleware, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

import { ENV } from 'env';

import { ProjectActions, projectSlice } from 'store/project';
import { SessionActions, sessionSlice } from 'store/session';

const middleware: Middleware[] = [];

if (ENV.isDev) {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    project: projectSlice.reducer,
    session: sessionSlice.reducer,
  },
  middleware,
});

export type Store = ReturnType<typeof store.getState>;

type AppActions = ProjectActions | SessionActions;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch<AppActions> =>
  useDispatch<AppDispatch>();

export const useAppSelector = <T>(fn: (state: Store) => T): T =>
  useSelector<Store, T>(fn);
