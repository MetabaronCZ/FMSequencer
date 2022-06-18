import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import { SessionTrackActions, sessionTrackReducer } from 'store/session/track';
import { createSessionData, SessionConfig, SessionData } from 'modules/session';

interface SessionActionPayload {
  readonly value: number;
  readonly pattern: number;
}

type CreateSessionAction = PayloadAction<SessionConfig>;
type SetSequenceAction = PayloadAction<SessionActionPayload>;
type SetTrackAction = PayloadAction<SessionActionPayload>;
type SetPatternAction = PayloadAction<number>;

export type SessionActions =
  | CreateSessionAction
  | SetSequenceAction
  | SetTrackAction
  | SetPatternAction
  | SessionTrackActions;

export type SessionReducer<T extends PayloadAction<unknown>> = (
  state: WritableDraft<SessionData>,
  action: T
) => void;

export const sessionSlice = createSlice({
  name: 'session',
  initialState: createSessionData(),
  reducers: {
    create: (state, action: CreateSessionAction) => {
      return createSessionData(action.payload);
    },
    setSequence: (state, action: SetSequenceAction) => {
      const { value, pattern } = action.payload;
      state.sequence = value;
      state.pattern = pattern;
    },
    setTrack: (state, action: SetTrackAction) => {
      const { value, pattern } = action.payload;
      state.track = value;
      state.pattern = pattern;
    },
    setPattern: (state, action: SetPatternAction) => {
      const pattern = action.payload;
      state.pattern = pattern;
    },
    ...sessionTrackReducer,
  },
});
