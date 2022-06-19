import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import { limitNumber } from 'core/number';

import { ProjectReducer } from 'store/project';
import { stepsReducer } from 'store/steps';
import { TrackActionPayload } from 'store/track';

import {
  PATTERN_LENGTH_MAX,
  PATTERN_LENGTH_MIN,
  PatternDivisionID,
} from 'modules/project/config';
import { PatternData, createPatternData } from 'modules/project/pattern';

export interface PatternActionPayload<T> extends TrackActionPayload<T> {
  readonly pattern: number;
}
type SetTrackPatternBeatsAction = PayloadAction<PatternActionPayload<number>>;
type SetTrackPatternDivisionAction = PayloadAction<
  PatternActionPayload<PatternDivisionID>
>;
type SetTrackPatternBarsAction = PayloadAction<PatternActionPayload<number>>;
type ClearTrackPatternAction = PayloadAction<TrackActionPayload<number>>;
type ClearTrackPatternNoteAction = PayloadAction<PatternActionPayload<number>>;

export type PatternsActions =
  | SetTrackPatternBeatsAction
  | SetTrackPatternDivisionAction
  | SetTrackPatternBarsAction
  | ClearTrackPatternAction
  | ClearTrackPatternNoteAction;

const removeOutOfPatternSteps = (pattern: WritableDraft<PatternData>): void => {
  const { beats, division, bars, steps } = pattern;
  const stepCount = beats * division * bars;
  pattern.steps = steps.filter(({ start }) => start < stepCount);
};

const setTrackPatternBeats: ProjectReducer<SetTrackPatternBeatsAction> = (
  state,
  action
) => {
  const { track, pattern, data } = action.payload;
  const ptn = state.tracks[track].patterns[pattern];
  ptn.beats = limitNumber(data, PATTERN_LENGTH_MIN, PATTERN_LENGTH_MAX);
  removeOutOfPatternSteps(ptn);
};

const setTrackPatternDivision: ProjectReducer<SetTrackPatternDivisionAction> = (
  state,
  action
) => {
  const { track, pattern, data } = action.payload;
  const ptn = state.tracks[track].patterns[pattern];
  ptn.division = data;
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
  setTrackPatternBeats,
  setTrackPatternDivision,
  setTrackPatternBars,
  clearTrackPattern,
  clearTrackPatternNote,
  ...stepsReducer,
};
