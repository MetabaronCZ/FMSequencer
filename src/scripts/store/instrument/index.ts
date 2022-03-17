import { PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'core/number';

import { ProjectReducer } from 'store/project';
import { TrackActionPayload } from 'store/track';
import { InstrumentFilterActions, instrumentFilterReducer } from 'store/instrument/filter';
import { InstrumentOperatorActions, instrumentOperatorReducer } from 'store/instrument/operator';
import { InstrumentEnvelopeActions, instrumentEnvelopeReducer } from 'store/instrument/envelope';

import {
    INSTRUMENT_NAME_LENGTH,
    AlgorithmID, ALGORITHM_MAX, ALGORITHM_MIN,
    LEVEL_MAX, LEVEL_MIN, PAN_MAX, PAN_MIN,
} from 'modules/engine/config';
import { AudioEngine } from 'modules/engine';
import { isAlgorithm } from 'modules/project/instrument/algorithm';
import { createInstrumentData, InstrumentConfig } from 'modules/project/instrument';

type LoadIntrumentAction = PayloadAction<TrackActionPayload<InstrumentConfig>>;
type ResetIntrumentAction = PayloadAction<TrackActionPayload<null>>;

type SetIntrumentNameAction = PayloadAction<TrackActionPayload<string>>;
type SetInstrumentAlgorithmAction = PayloadAction<TrackActionPayload<AlgorithmID>>;
type SetInstrumentLevelAction = PayloadAction<TrackActionPayload<number>>;
type SetInstrumentPanAction = PayloadAction<TrackActionPayload<number>>;

export type InstrumentActions =
    LoadIntrumentAction | ResetIntrumentAction |
    SetIntrumentNameAction | SetInstrumentAlgorithmAction |
    SetInstrumentLevelAction | SetInstrumentPanAction |
    InstrumentFilterActions | InstrumentOperatorActions | InstrumentEnvelopeActions;

const loadInstrument: ProjectReducer<LoadIntrumentAction> = (state, action) => {
    const { track, data } = action.payload;
    const inst = createInstrumentData(track, data);
    state.tracks[track].instrument = createInstrumentData(track, inst);
};

const resetInstrument: ProjectReducer<ResetIntrumentAction> = (state, action) => {
    const { track } = action.payload;
    const inst = createInstrumentData(track);
    state.tracks[track].instrument = createInstrumentData(track, inst);
};

const setInstrumentName: ProjectReducer<SetIntrumentNameAction> = (state, action) => {
    const { track, data } = action.payload;
    state.tracks[track].instrument.name = data.substring(0, INSTRUMENT_NAME_LENGTH);
};

const setInstrumentAlgorithm: ProjectReducer<SetInstrumentAlgorithmAction> = (state, action) => {
    const { track, data } = action.payload;
    const value = limitNumber(data, ALGORITHM_MIN, ALGORITHM_MAX);

    if (!isAlgorithm(value)) {
        throw new Error(`Could not set algorithm: Invalid value "${action.payload}"!`);
    }
    state.tracks[track].instrument.algorithm = value;

    const time = AudioEngine.getTime();
    AudioEngine.voices[track].setAlgorithm(value, time);
};

const setInstrumentLevel: ProjectReducer<SetInstrumentLevelAction> = (state, action) => {
    const { track, data } = action.payload;
    const value = limitNumber(data, LEVEL_MIN, LEVEL_MAX);
    state.tracks[track].instrument.level = value;

    const time = AudioEngine.getTime();
    AudioEngine.voices[track].level.set(value, time);
};

const setInstrumentPan: ProjectReducer<SetInstrumentPanAction> = (state, action) => {
    const { track, data } = action.payload;
    const value = limitNumber(data, PAN_MIN, PAN_MAX);
    state.tracks[track].instrument.pan = value;

    const time = AudioEngine.getTime();
    AudioEngine.voices[track].pan.set(value, time);
};

export const instrumentReducer = {
    loadInstrument,
    resetInstrument,
    setInstrumentName,
    setInstrumentAlgorithm,
    setInstrumentLevel,
    setInstrumentPan,
    ...instrumentFilterReducer,
    ...instrumentOperatorReducer,
    ...instrumentEnvelopeReducer,
};
