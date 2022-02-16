import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'modules/core/number';

import { PAN_MAX, PAN_MIN } from 'modules/audio/instrument/pan';
import { LEVEL_MAX, LEVEL_MIN } from 'modules/audio/instrument/level';
import { FREQUENCY_MAX, FREQUENCY_MIN } from 'modules/audio/instrument/frequency';
import {
    ENVELOPE_ATTACK_MAX, ENVELOPE_ATTACK_MIN,
    ENVELOPE_DECAY_MAX, ENVELOPE_DECAY_MIN,
    ENVELOPE_RELEASE_MAX, ENVELOPE_RELEASE_MIN,
    ENVELOPE_SUSTAIN_MAX, ENVELOPE_SUSTAIN_MIN,
} from 'modules/audio/instrument/envelope';

import { AudioEngine } from 'modules/engine';
import { RatioID } from 'modules/audio/instrument/ratio';
import { OscillatorTypeID } from 'modules/audio/instrument/oscillator';
import { FilterTypeID, RESONANCE_MAX, RESONANCE_MIN } from 'modules/audio/instrument/filter';
import { ALGORITHM_MAX, ALGORITHM_MIN, isAlgorithm } from 'modules/audio/instrument/algorithm';
import { createInstrumentData, InstrumentConfig, INSTRUMENT_COUNT, INSTRUMENT_NAME_LENGTH } from 'modules/audio/instrument';

interface InstrumentActionPayload<T> {
    readonly id: number;
    readonly data: T;
}

interface OperatorActionPayload<T> {
    readonly operator: number;
    readonly instrument: number;
    readonly data: T;
}

type LoadInstrumentAction = PayloadAction<InstrumentActionPayload<InstrumentConfig>>;
type SetInstrumentNameAction = PayloadAction<InstrumentActionPayload<string>>;
type SetInstrumentPanAction = PayloadAction<InstrumentActionPayload<number>>;
type SetInstrumentLevelAction = PayloadAction<InstrumentActionPayload<number>>;
type SetInstrumentAlgorithmAction = PayloadAction<InstrumentActionPayload<number>>;
type SetInstrumentFilterTypeAction = PayloadAction<InstrumentActionPayload<FilterTypeID>>;
type SetInstrumentFilterCutoffAction = PayloadAction<InstrumentActionPayload<number>>;
type SetInstrumentFilterResonanceAction = PayloadAction<InstrumentActionPayload<number>>;
type SetInstrumentOperatorTypeAction = PayloadAction<OperatorActionPayload<OscillatorTypeID>>;
type SetInstrumentOperatorLevelAction = PayloadAction<OperatorActionPayload<number>>;
type SetInstrumentOperatorRatioAction = PayloadAction<OperatorActionPayload<RatioID>>;
type SetInstrumentEnvelopeActionAction = PayloadAction<OperatorActionPayload<number>>;
type SetInstrumentEnvelopeDecayAction = PayloadAction<OperatorActionPayload<number>>;
type SetInstrumentEnvelopeSustainAction = PayloadAction<OperatorActionPayload<number>>;
type SetInstrumentEnvelopeReleaseAction = PayloadAction<OperatorActionPayload<number>>;

export type InstrumentActions =
    SetInstrumentNameAction |
    LoadInstrumentAction |
    SetInstrumentPanAction |
    SetInstrumentLevelAction |
    SetInstrumentAlgorithmAction |
    SetInstrumentFilterTypeAction |
    SetInstrumentFilterCutoffAction |
    SetInstrumentFilterResonanceAction |
    SetInstrumentOperatorTypeAction |
    SetInstrumentOperatorLevelAction |
    SetInstrumentOperatorRatioAction |
    SetInstrumentEnvelopeActionAction |
    SetInstrumentEnvelopeDecayAction |
    SetInstrumentEnvelopeSustainAction |
    SetInstrumentEnvelopeReleaseAction;

export const instrumentSlice = createSlice({
    name: 'instruments',
    initialState: (
        Array(INSTRUMENT_COUNT).fill(0)
            .map((val, i) => createInstrumentData({
                name: `Instrument ${i + 1}`,
            }))
    ),
    reducers: {
        create: (state, action: LoadInstrumentAction) => {
            const { id, data } = action.payload;
            state[id] = createInstrumentData(data);
        },
        setName: (state, action: SetInstrumentNameAction) => {
            const { id, data } = action.payload;
            state[id].name = data.substring(0, INSTRUMENT_NAME_LENGTH);
        },
        setAlgorithm: (state, action: SetInstrumentAlgorithmAction) => {
            const { id, data } = action.payload;
            const value = limitNumber(data, ALGORITHM_MIN, ALGORITHM_MAX);

            if (!isAlgorithm(value)) {
                throw new Error(`Could not set algorithm: Invalid value "${action.payload}"!`);
            }
            state[id].algorithm = value;

            const time = AudioEngine.getTime();
            AudioEngine.voices[id].setAlgorithm(value, time);
        },
        setLevel: (state, action: SetInstrumentLevelAction) => {
            const { id, data } = action.payload;
            const value = limitNumber(data, LEVEL_MIN, LEVEL_MAX);
            state[id].level = value;

            const time = AudioEngine.getTime();
            AudioEngine.voices[id].level.set(value, time);
        },
        setPan: (state, action: SetInstrumentPanAction) => {
            const { id, data } = action.payload;
            const value = limitNumber(data, PAN_MIN, PAN_MAX);
            state[id].pan = value;

            const time = AudioEngine.getTime();
            AudioEngine.voices[id].pan.set(value, time);
        },
        setFilterType: (state, action: SetInstrumentFilterTypeAction) => {
            const { id, data } = action.payload;
            state[id].filter.type = data;

            AudioEngine.voices[id].filter.setType(data);
        },
        setFilterCutoff: (state, action: SetInstrumentFilterCutoffAction) => {
            const { id, data } = action.payload;
            const value = limitNumber(data, FREQUENCY_MIN, FREQUENCY_MAX);
            state[id].filter.cutoff = value;

            const time = AudioEngine.getTime();
            AudioEngine.voices[id].filter.setCutoff(value, time);
        },
        setFilterResonance: (state, action: SetInstrumentFilterResonanceAction) => {
            const { id, data } = action.payload;
            const value = limitNumber(data, RESONANCE_MIN, RESONANCE_MAX);
            state[id].filter.resonance = value;

            const time = AudioEngine.getTime();
            AudioEngine.voices[id].filter.setResonance(value, time);
        },
        setOperatorType: (state, action: SetInstrumentOperatorTypeAction) => {
            const { operator, instrument, data } = action.payload;
            state[instrument].operators[operator].type = data;

            AudioEngine.voices[instrument].operators[operator].setType(data);
        },
        setOperatorLevel: (state, action: SetInstrumentOperatorLevelAction) => {
            const { operator, instrument, data } = action.payload;
            const value = limitNumber(data, LEVEL_MIN, LEVEL_MAX);
            state[instrument].operators[operator].level = value;

            const time = AudioEngine.getTime();
            AudioEngine.voices[instrument].operators[operator].setLevel(value, time);
        },
        setOperatorRatio: (state, action: SetInstrumentOperatorRatioAction) => {
            const { operator, instrument, data } = action.payload;
            state[instrument].operators[operator].ratio = data;

            const time = AudioEngine.getTime();
            AudioEngine.voices[instrument].operators[operator].setRatio(data, time);
        },
        setOperatorEnvelopeAction: (state, action: SetInstrumentEnvelopeActionAction) => {
            const { operator, instrument, data } = action.payload;
            const value = limitNumber(data, ENVELOPE_ATTACK_MIN, ENVELOPE_ATTACK_MAX);
            state[instrument].operators[operator].envelope.attack = value;
        },
        setOperatorEnvelopeDecay: (state, action: SetInstrumentEnvelopeDecayAction) => {
            const { operator, instrument, data } = action.payload;
            const value = limitNumber(data, ENVELOPE_DECAY_MIN, ENVELOPE_DECAY_MAX);
            state[instrument].operators[operator].envelope.decay = value;
        },
        setOperatorEnvelopeSustain: (state, action: SetInstrumentEnvelopeSustainAction) => {
            const { operator, instrument, data } = action.payload;
            const value = limitNumber(data, ENVELOPE_SUSTAIN_MIN, ENVELOPE_SUSTAIN_MAX);
            state[instrument].operators[operator].envelope.sustain = value;
        },
        setOperatorEnvelopeRelease: (state, action: SetInstrumentEnvelopeReleaseAction) => {
            const { operator, instrument, data } = action.payload;
            const value = limitNumber(data, ENVELOPE_RELEASE_MIN, ENVELOPE_RELEASE_MAX);
            state[instrument].operators[operator].envelope.release = value;
        },
    },
});
