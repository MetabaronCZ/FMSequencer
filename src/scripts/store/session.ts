import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSessionData, SessionConfig } from 'modules/session';

type CreateSessionAction = PayloadAction<SessionConfig>;
export type SessionActions = CreateSessionAction;

export const sessionSlice = createSlice({
    name: 'session',
    initialState: createSessionData(),
    reducers: {
        create: (state, action: CreateSessionAction) => {
            return createSessionData(action.payload);
        },
    },
});
