import { PayloadAction } from '@reduxjs/toolkit';
import { ProjectReducer } from 'store/project';

interface SequenceActionPayload<T> {
    readonly sequence: number;
    readonly data: T;
}
interface SetTrackPatternActionPayload {
    readonly sequence: number;
    readonly track: number;
    readonly bar: number;
    readonly pattern: number;
}
interface RemoveTrackPatternActionPayload {
    readonly sequence: number;
    readonly track: number;
    readonly bar: number;
}
type SetSequenceLengthAction = PayloadAction<SequenceActionPayload<number>>;
type SetSequenceTrackPatternAction = PayloadAction<SetTrackPatternActionPayload>;
type RemoveTrackPatternAction = PayloadAction<RemoveTrackPatternActionPayload>;

export type SequencesActions =
    SetSequenceLengthAction |
    SetSequenceTrackPatternAction |
    RemoveTrackPatternAction;

const setSequenceLength: ProjectReducer<SetSequenceLengthAction> = (state, action) => {
    const { sequence, data } = action.payload;
    state.sequences[sequence].bars = data;

    // remove out-of-bar patterns
    for (const track of state.sequences[sequence].tracks) {
        track.patterns = track.patterns.filter(({ bar }) => {
            return bar < data;
        });
    }
};

const setSequenceTrackPattern: ProjectReducer<SetSequenceTrackPatternAction> = (state, action) => {
    const { sequence, track, bar, pattern } = action.payload;
    const { patterns } = state.sequences[sequence].tracks[track];
    const existingSlot = patterns.find((ptn) => bar === ptn.bar);

    if (existingSlot) {
        existingSlot.pattern = pattern;
    } else {
        patterns.push({ pattern, bar });
    }
};

const removeSequenceTrackPattern: ProjectReducer<RemoveTrackPatternAction> = (state, action) => {
    const { sequence, track, bar } = action.payload;
    const seqTrack = state.sequences[sequence].tracks[track];
    seqTrack.patterns = seqTrack.patterns.filter((ptn) => bar !== ptn.bar);
};

export const sequencesReducer = {
    setSequenceLength,
    setSequenceTrackPattern,
    removeSequenceTrackPattern,
};
