import { PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'core/number';

import { stepsReducer } from 'store/steps';
import { ProjectReducer } from 'store/project';
import { TrackActionPayload } from 'store/track';

import { createPatternData } from 'modules/project/pattern';
import {
  PatternDivisionID,
  PATTERN_LENGTH_MAX,
  PATTERN_LENGTH_MIN,
} from 'modules/project/config';

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

const setTrackPatternBeats: ProjectReducer<SetTrackPatternBeatsAction> = (
  state,
  action
) => {
  const { track, pattern, data } = action.payload;
  const ptn = state.tracks[track].patterns[pattern];
  ptn.beats = limitNumber(data, PATTERN_LENGTH_MIN, PATTERN_LENGTH_MAX);
};

const setTrackPatternDivision: ProjectReducer<SetTrackPatternDivisionAction> = (
  state,
  action
) => {
  const { track, pattern, data } = action.payload;
  const ptn = state.tracks[track].patterns[pattern];
  ptn.division = data;

  // remove out-of-pattern notes
  const steps = ptn.beats * ptn.division;
  ptn.steps = ptn.steps.filter(({ start }) => start <= steps - 1);
};

const setTrackPatternBars: ProjectReducer<SetTrackPatternBarsAction> = (
  state,
  action
) => {
  const { track, pattern, data } = action.payload;
  const ptn = state.tracks[track].patterns[pattern];
  ptn.bars = limitNumber(data, PATTERN_LENGTH_MIN, PATTERN_LENGTH_MAX);
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
