import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import { limitNumber } from 'core/number';

import { ProjectReducer } from 'store/project';
import { stepsReducer } from 'store/steps';
import { TrackActionPayload } from 'store/track';

import {
  PATTERN_LENGTH_MAX,
  PATTERN_LENGTH_MIN,
  SignatureID,
} from 'modules/project/config';
import {
  PatternData,
  createPatternData,
  getSignatureData,
} from 'modules/project/pattern';

export interface PatternActionPayload<T> extends TrackActionPayload<T> {
  readonly pattern: number;
}
type SetTrackPatternSignatureAction = PayloadAction<
  PatternActionPayload<SignatureID>
>;
type SetTrackPatternBarsAction = PayloadAction<PatternActionPayload<number>>;
type ClearTrackPatternAction = PayloadAction<TrackActionPayload<number>>;
type ClearTrackPatternNoteAction = PayloadAction<PatternActionPayload<number>>;

export type PatternsActions =
  | SetTrackPatternSignatureAction
  | SetTrackPatternBarsAction
  | ClearTrackPatternAction
  | ClearTrackPatternNoteAction;

const removeOutOfPatternSteps = (pattern: WritableDraft<PatternData>): void => {
  const { signature, bars, steps } = pattern;
  const [beats, division] = getSignatureData(signature);
  const stepCount = beats * division * bars;
  pattern.steps = steps.filter(({ start }) => start < stepCount);
};

const setTrackPatternSignature: ProjectReducer<
  SetTrackPatternSignatureAction
> = (state, action) => {
  const { track, pattern, data } = action.payload;
  const ptn = state.tracks[track].patterns[pattern];
  ptn.signature = data;
  removeOutOfPatternSteps(ptn);
};

const setTrackPatternBars: ProjectReducer<SetTrackPatternBarsAction> = (
  state,
  action
) => {
  const { track, pattern, data } = action.payload;
  const ptn = state.tracks[track].patterns[pattern];
  ptn.bars = limitNumber(data, PATTERN_LENGTH_MIN, PATTERN_LENGTH_MAX);
  removeOutOfPatternSteps(ptn);
};

const clearTrackPattern: ProjectReducer<ClearTrackPatternAction> = (
  state,
  action
) => {
  const { track, data } = action.payload;
  state.tracks[track].patterns[data] = createPatternData(data);
};

const clearTrackPatternNote: ProjectReducer<ClearTrackPatternNoteAction> = (
  state,
  action
) => {
  const { track, pattern, data } = action.payload;
  const ptn = state.tracks[track].patterns[pattern];
  ptn.steps = ptn.steps.filter(({ start }) => start !== data);
};

export const patternsReducer = {
  setTrackPatternSignature,
  setTrackPatternBars,
  clearTrackPattern,
  clearTrackPatternNote,
  ...stepsReducer,
};
