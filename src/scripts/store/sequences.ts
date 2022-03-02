import { PayloadAction } from '@reduxjs/toolkit';
import { ProjectReducer } from 'store/project';

interface SequenceAction<T> {
    readonly sequence: number;
    readonly data: T;
}
type SetSequenceLength = PayloadAction<SequenceAction<number>>;
export type SequencesActions = SetSequenceLength;

const setSequenceLength: ProjectReducer<SetSequenceLength> = (state, action) => {
    const { sequence, data } = action.payload;
    state.sequences[sequence].bars = data;

    // remove out-of-bar- patterns
    for (const track of state.sequences[sequence].tracks) {
        track.patterns = track.patterns.filter(({ bar }) => {
            return bar < data;
        });
    }
};

export const sequencesReducer = {
    setSequenceLength,
};
