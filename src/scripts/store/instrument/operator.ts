import { PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'core/number';

import { ProjectReducer } from 'store/project';
import { TrackActionPayload } from 'store/track';

import { AudioEngine } from 'modules/engine';
import {
  LEVEL_MAX,
  LEVEL_MIN,
  OscillatorTypeID,
  RatioID,
} from 'modules/engine/config';

export interface OperatorActionPayload<T> extends TrackActionPayload<T> {
  readonly operator: number;
}
type SetInstrumentOperatorActiveAction = PayloadAction<
  OperatorActionPayload<boolean>
>;
type SetInstrumentOperatorTypeAction = PayloadAction<
  OperatorActionPayload<OscillatorTypeID>
>;
type SetInstrumentOperatorLevelAction = PayloadAction<
  OperatorActionPayload<number>
>;
type SetInstrumentOperatorRatioAction = PayloadAction<
  OperatorActionPayload<RatioID>
>;

export type InstrumentOperatorActions =
  | SetInstrumentOperatorTypeAction
  | SetInstrumentOperatorLevelAction
  | SetInstrumentOperatorRatioAction;

const setInstrumentOperatorActive: ProjectReducer<
  SetInstrumentOperatorActiveAction
> = (state, action) => {
  const { track, operator, data } = action.payload;
  state.tracks[track].instrument.operators[operator].active = data;

  const op = AudioEngine.voices[track].operators[operator];
  op.setActive(data);
};

const setInstrumentOperatorType: ProjectReducer<
  SetInstrumentOperatorTypeAction
> = (state, action) => {
  const { track, operator, data } = action.payload;
  state.tracks[track].instrument.operators[operator].type = data;

  const op = AudioEngine.voices[track].operators[operator];
  op.setType(data);
};

const setInstrumentOperatorLevel: ProjectReducer<
  SetInstrumentOperatorLevelAction
> = (state, action) => {
  const { track, operator, data } = action.payload;
  const value = limitNumber(data, LEVEL_MIN, LEVEL_MAX);
  state.tracks[track].instrument.operators[operator].level = value;

  const time = AudioEngine.getTime();
  const op = AudioEngine.voices[track].operators[operator];
  op.setLevel(value, time);
};

const setInstrumentOperatorRatio: ProjectReducer<
  SetInstrumentOperatorRatioAction
> = (state, action) => {
  const { track, operator, data } = action.payload;
  state.tracks[track].instrument.operators[operator].ratio = data;

  const time = AudioEngine.getTime();
  const op = AudioEngine.voices[track].operators[operator];
  op.setRatio(data, time);
};

export const instrumentOperatorReducer = {
  setInstrumentOperatorActive,
  setInstrumentOperatorType,
  setInstrumentOperatorLevel,
  setInstrumentOperatorRatio,
};
