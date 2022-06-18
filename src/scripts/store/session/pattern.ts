import { PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'core/number';

import { SessionReducer } from 'store/session';

import {
  SEQUENCE_LENGTH_MAX,
  SEQUENCE_LENGTH_MIN,
} from 'modules/project/config';

type SetPatternPageAction = PayloadAction<{
  readonly page: number;
  readonly bars: number;
}>;
type ResetPatternPageAction = PayloadAction<void>;

export type SessionPatternActions =
  | SetPatternPageAction
  | ResetPatternPageAction;

const setPatternPage: SessionReducer<SetPatternPageAction> = (
  state,
  action
) => {
  const { page, bars } = action.payload;

  state.patternPage = limitNumber(
    page,
    SEQUENCE_LENGTH_MIN,
    Math.min(SEQUENCE_LENGTH_MAX, bars)
  );
};

const resetPatternPage: SessionReducer<ResetPatternPageAction> = (state) => {
  state.patternPage = 1;
};

export const sessionPatternReducer = {
  setPatternPage,
  resetPatternPage,
};
