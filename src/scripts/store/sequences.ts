import { PayloadAction } from '@reduxjs/toolkit';

import { ProjectReducer } from 'store/project';
import { createSequenceData } from 'modules/project/sequence';

interface SequenceActionPayload<T> {
    readonly sequence: number;
    readonly data: T;
}
interface SetTrackPatternActionPayload {
    readonly sequence: number;
    readonly track: number;
    readonly pattern: number;
}
type ClearSequenceAction = PayloadAction<number>;
type SetSequenceLengthAction = PayloadAction<SequenceActionPayload<number>>;
type SetSequenceTrackPatternAction = PayloadAction<SetTrackPatternActionPayload>;

export type SequencesActions =
    ClearSequenceAction |
    SetSequenceLengthAction |
    SetSequenceTrackPatternAction;

const clearSequence: ProjectReducer<ClearSequenceAction> = (state, action) => {
    const sequence = action.payload;
    state.sequences[sequence] = createSequenceData(sequence);
};

const setSequenceLength: ProjectReducer<SetSequenceLengthAction> = (state, action) => {
    const { sequence, data } = action.payload;
    state.sequences[sequence].bars = data;
};

const setSequenceTrackPattern: ProjectReducer<SetSequenceTrackPatternAction> = (state, action) => {
    const { sequence, track, pattern } = action.payload;
    state.sequences[sequence].tracks[track].pattern = pattern;
};

export const sequencesReducer = {
    clearSequence,
    setSequenceLength,
    setSequenceTrackPattern,
};
