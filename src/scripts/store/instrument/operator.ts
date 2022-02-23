import { PayloadAction } from '@reduxjs/toolkit';

import { TrackActionPayload } from 'store/track';
import { ProjectReducer } from 'store/project';

import { LEVEL_MAX, LEVEL_MIN, OscillatorTypeID, RatioID } from 'modules/engine/config';
import { limitNumber } from 'modules/core/number';
import { AudioEngine } from 'modules/engine';

export interface OperatorActionPayload<T> extends TrackActionPayload<T> {
    readonly operator: number;
}
type SetInstrumentOperatorTypeAction = PayloadAction<OperatorActionPayload<OscillatorTypeID>>;
type SetInstrumentOperatorLevelAction = PayloadAction<OperatorActionPayload<number>>;
type SetInstrumentOperatorRatioAction = PayloadAction<OperatorActionPayload<RatioID>>;

export type InstrumentOperatorActions =
    SetInstrumentOperatorTypeAction |
    SetInstrumentOperatorLevelAction |
    SetInstrumentOperatorRatioAction;

const setInstrumentOperatorType: ProjectReducer<SetInstrumentOperatorTypeAction> = (state, action) => {
    const { track, operator, data } = action.payload;
    state.tracks[track].instrument.operators[operator].type = data;

    AudioEngine.voices[track].operators[operator].setType(data);
};

const setInstrumentOperatorLevel: ProjectReducer<SetInstrumentOperatorLevelAction> = (state, action) => {
    const { track, operator, data } = action.payload;
    const value = limitNumber(data, LEVEL_MIN, LEVEL_MAX);
    state.tracks[track].instrument.operators[operator].level = value;

    const time = AudioEngine.getTime();
    AudioEngine.voices[track].operators[operator].setLevel(value, time);
};

const setInstrumentOperatorRatio: ProjectReducer<SetInstrumentOperatorRatioAction> = (state, action) => {
    const { track, operator, data } = action.payload;
    state.tracks[track].instrument.operators[operator].ratio = data;

    const time = AudioEngine.getTime();
    AudioEngine.voices[track].operators[operator].setRatio(data, time);
};

export const instrumentOperatorReducer = {
    setInstrumentOperatorType,
    setInstrumentOperatorLevel,
    setInstrumentOperatorRatio,
};
