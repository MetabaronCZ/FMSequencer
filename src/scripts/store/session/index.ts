import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import {
  SessionPatternActions,
  sessionPatternReducer,
} from 'store/session/pattern';
import { SessionTrackActions, sessionTrackReducer } from 'store/session/track';

import { SessionConfig, SessionData, createSessionData } from 'modules/session';

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
  | SessionTrackActions
  | SessionPatternActions;

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
      state.patternPage = 1;
    },
    setTrack: (state, action: SetTrackAction) => {
      const { value, pattern } = action.payload;
      state.track = value;
      state.pattern = pattern;
      state.patternPage = 1;
    },
    setPattern: (state, action: SetPatternAction) => {
      const pattern = action.payload;
      state.pattern = pattern;
      state.patternPage = 1;
    },
    ...sessionTrackReducer,
    ...sessionPatternReducer,
  },
});
