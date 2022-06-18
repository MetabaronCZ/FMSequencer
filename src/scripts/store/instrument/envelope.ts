import { PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'core/number';

import { OperatorActionPayload } from 'store/instrument/operator';
import { ProjectReducer } from 'store/project';

import {
  ENVELOPE_ATTACK_MAX,
  ENVELOPE_ATTACK_MIN,
  ENVELOPE_DECAY_MAX,
  ENVELOPE_DECAY_MIN,
  ENVELOPE_RELEASE_MAX,
  ENVELOPE_RELEASE_MIN,
  ENVELOPE_SUSTAIN_MAX,
  ENVELOPE_SUSTAIN_MIN,
} from 'modules/engine/config';

type SetInstrumentEnvelopeActionAction = PayloadAction<
  OperatorActionPayload<number>
>;
type SetInstrumentEnvelopeDecayAction = PayloadAction<
  OperatorActionPayload<number>
>;
type SetInstrumentEnvelopeSustainAction = PayloadAction<
  OperatorActionPayload<number>
>;
type SetInstrumentEnvelopeReleaseAction = PayloadAction<
  OperatorActionPayload<number>
>;

export type InstrumentEnvelopeActions =
  | SetInstrumentEnvelopeActionAction
  | SetInstrumentEnvelopeDecayAction
  | SetInstrumentEnvelopeSustainAction
  | SetInstrumentEnvelopeReleaseAction;

const setInstrumentOperatorEnvelopeAction: ProjectReducer<
  SetInstrumentEnvelopeActionAction
> = (state, action) => {
  const { track, operator, data } = action.payload;
  const value = limitNumber(data, ENVELOPE_ATTACK_MIN, ENVELOPE_ATTACK_MAX);
  state.tracks[track].instrument.operators[operator].envelope.attack = value;
};

const setInstrumentOperatorEnvelopeDecay: ProjectReducer<
  SetInstrumentEnvelopeDecayAction
> = (state, action) => {
  const { track, operator, data } = action.payload;
  const value = limitNumber(data, ENVELOPE_DECAY_MIN, ENVELOPE_DECAY_MAX);
  state.tracks[track].instrument.operators[operator].envelope.decay = value;
};

const setInstrumentOperatorEnvelopeSustain: ProjectReducer<
  SetInstrumentEnvelopeSustainAction
> = (state, action) => {
  const { track, operator, data } = action.payload;
  const value = limitNumber(data, ENVELOPE_SUSTAIN_MIN, ENVELOPE_SUSTAIN_MAX);
  state.tracks[track].instrument.operators[operator].envelope.sustain = value;
};

const setInstrumentOperatorEnvelopeRelease: ProjectReducer<
  SetInstrumentEnvelopeReleaseAction
> = (state, action) => {
  const { track, operator, data } = action.payload;
  const value = limitNumber(data, ENVELOPE_RELEASE_MIN, ENVELOPE_RELEASE_MAX);
  state.tracks[track].instrument.operators[operator].envelope.release = value;
};

export const instrumentEnvelopeReducer = {
  setInstrumentOperatorEnvelopeAction,
  setInstrumentOperatorEnvelopeDecay,
  setInstrumentOperatorEnvelopeSustain,
  setInstrumentOperatorEnvelopeRelease,
};
