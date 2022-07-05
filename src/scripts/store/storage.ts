import { Logger } from 'core/logger';

import { AppState, AppStore } from 'store';

const storageKey = 'APP';

export const loadStore = (): AppState | undefined => {
  const data = sessionStorage.getItem(storageKey);

  try {
    return data ? (JSON.parse(data) as AppState) : undefined;
  } catch (error) {
    Logger.error('Could not load store data!');
    Logger.error(error);
  }
  return;
};

export const saveStore = (store: AppStore): void => {
  const state = store.getState();

  try {
    const data = JSON.stringify(state);
    sessionStorage.setItem(storageKey, data);
  } catch (error) {
    Logger.error('Could not save store data!');
    Logger.error(error);
  }
};
