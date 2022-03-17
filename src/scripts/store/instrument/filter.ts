import { PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'core/number';

import { ProjectReducer } from 'store/project';
import { TrackActionPayload } from 'store/track';

import {
    FilterTypeID,
    FREQUENCY_MAX, FREQUENCY_MIN, RESONANCE_MAX, RESONANCE_MIN,
} from 'modules/engine/config';
import { AudioEngine } from 'modules/engine';

type SetInstrumentFilterTypeAction = PayloadAction<TrackActionPayload<FilterTypeID>>;
type SetInstrumentFilterCutoffAction = PayloadAction<TrackActionPayload<number>>;
type SetInstrumentFilterResonanceAction = PayloadAction<TrackActionPayload<number>>;

export type InstrumentFilterActions =
    SetInstrumentFilterTypeAction |
    SetInstrumentFilterCutoffAction |
    SetInstrumentFilterResonanceAction;

const setInstrumentFilterType: ProjectReducer<SetInstrumentFilterTypeAction> = (state, action) => {
    const { track, data } = action.payload;
    state.tracks[track].instrument.filter.type = data;

    AudioEngine.voices[track].filter.setType(data);
};

const setInstrumentFilterCutoff: ProjectReducer<SetInstrumentFilterCutoffAction> = (state, action) => {
    const { track, data } = action.payload;
    const value = limitNumber(data, FREQUENCY_MIN, FREQUENCY_MAX);
    state.tracks[track].instrument.filter.cutoff = value;

    const time = AudioEngine.getTime();
    AudioEngine.voices[track].filter.setCutoff(value, time);
};

const setInstrumentFilterResonance: ProjectReducer<SetInstrumentFilterResonanceAction> = (state, action) => {
    const { track, data } = action.payload;
    const value = limitNumber(data, RESONANCE_MIN, RESONANCE_MAX);
    state.tracks[track].instrument.filter.resonance = value;

    const time = AudioEngine.getTime();
    AudioEngine.voices[track].filter.setResonance(value, time);
};

export const instrumentFilterReducer = {
    setInstrumentFilterType,
    setInstrumentFilterCutoff,
    setInstrumentFilterResonance,
};
