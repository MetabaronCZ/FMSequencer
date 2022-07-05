import { Dispatch, Middleware, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

import { ENV } from 'env';

import { ProjectActions, projectSlice } from 'store/project';
import { SessionActions, sessionSlice } from 'store/session';
import { loadStore, saveStore } from 'store/storage';

import { ProjectData } from 'modules/project';
import { SessionData } from 'modules/session';

const middleware: Middleware[] = [];
type AppMiddleware = typeof middleware;

if (ENV.isDev) {
  middleware.push(logger);
}
const preloadedState = loadStore();

export type AppActions = ProjectActions | SessionActions;

export interface AppState {
  readonly project: ProjectData;
  readonly session: SessionData;
}

export const store = configureStore<AppState, AppActions, AppMiddleware>({
  reducer: {
    project: projectSlice.reducer,
    session: sessionSlice.reducer,
  },
  preloadedState,
  middleware,
});

// persist store to sessionStorege on change
store.subscribe(() => saveStore(store));

export type AppStore = typeof store;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): Dispatch<AppActions> =>
  useDispatch<AppDispatch>();

export const useAppSelector = <T>(fn: (state: AppState) => T): T =>
  useSelector<AppState, T>(fn);
