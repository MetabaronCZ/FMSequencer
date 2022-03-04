import { PayloadAction } from '@reduxjs/toolkit';

import { ProjectReducer } from 'store/project';

import { limitNumber } from 'modules/core/number';
import { createSongSequenceData } from 'modules/project/song-sequence';
import {
    SEQUENCE_REPEAT_MAX, SEQUENCE_REPEAT_MIN,
    SONG_LENGTH_MAX, SONG_LENGTH_MIN,
} from 'modules/project/config';

interface SongPayload<T> {
    readonly slot: number;
    readonly data: T;
}
type AddSongSequenceAction = PayloadAction;
type MoveSongSequenceRepeatAction = PayloadAction<SongPayload<number>>;
type RemoveSongSequenceAction = PayloadAction<SongPayload<null>>;
type SetSongSequenceAction = PayloadAction<SongPayload<number>>;
type SetSongSequenceRepeatAction = PayloadAction<SongPayload<number>>;

export type SongActions =
    AddSongSequenceAction |
    MoveSongSequenceRepeatAction |
    RemoveSongSequenceAction |
    SetSongSequenceAction |
    SetSongSequenceRepeatAction;

const addSongSequence: ProjectReducer<AddSongSequenceAction> = (state) => {
    const seq = createSongSequenceData();
    state.song.sequences.push(seq);
};

const removeSongSequence: ProjectReducer<RemoveSongSequenceAction> = (state, action) => {
    const { slot } = action.payload;
    state.song.sequences.splice(slot, 1);
};

const moveSongSequence: ProjectReducer<MoveSongSequenceRepeatAction> = (state, action) => {
    const { slot, data } = action.payload;
    const max = state.song.sequences.length - 1;

    if (slot < 0 || slot > max || data < 0 || data > max) {
        return;
    }
    const src = state.song.sequences[slot];
    const tgt = state.song.sequences[data];
    state.song.sequences[data] = src;
    state.song.sequences[slot] = tgt;
};

const setSongSequence: ProjectReducer<SetSongSequenceAction> = (state, action) => {
    const { slot, data } = action.payload;
    const seq = state.song.sequences[slot];

    if (!seq) {
        throw new Error(`Could not update sequence: Invalid sequence slot "${slot}"!`);
    }
    seq.sequence = limitNumber(data, SONG_LENGTH_MIN, SONG_LENGTH_MAX);
};

const setSongSequenceRepeat: ProjectReducer<SetSongSequenceRepeatAction> = (state, action) => {
    const { slot, data } = action.payload;
    const seq = state.song.sequences[slot];

    if (!seq) {
        throw new Error(`Could not update sequence: Invalid sequence slot "${slot}"!`);
    }
    seq.repeat = limitNumber(data, SEQUENCE_REPEAT_MIN, SEQUENCE_REPEAT_MAX);
};

export const songReducer = {
    addSongSequence,
    moveSongSequence,
    removeSongSequence,
    setSongSequence,
    setSongSequenceRepeat,
};
