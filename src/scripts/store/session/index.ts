import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import { SessionTrackActions, sessionTrackReducer } from 'store/session/track';
import { createSessionData, SessionConfig, SessionData } from 'modules/session';

type CreateSessionAction = PayloadAction<SessionConfig>;

export type SessionActions =
    CreateSessionAction |
    SessionTrackActions;

export type SessionReducer<T extends PayloadAction<unknown>> = (state: WritableDraft<SessionData>, action: T) => void;

export const sessionSlice = createSlice({
    name: 'session',
    initialState: createSessionData(),
    reducers: {
        create: (state, action: CreateSessionAction) => {
            return createSessionData(action.payload);
        },
        ...sessionTrackReducer,
    },
});
