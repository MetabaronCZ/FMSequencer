import { PayloadAction } from '@reduxjs/toolkit';

import { limitNumber } from 'core/number';

import { ProjectReducer } from 'store/project';
import { TrackActionPayload } from 'store/track';

import { createNoteData } from 'modules/project/note';
import { createPatternData } from 'modules/project/pattern';
import { PITCH_MAX, PITCH_MIN, VELOCITY_MAX, VELOCITY_MIN } from 'modules/engine/config';
import { PatternDivisionID, PATTERN_LENGTH_MAX, PATTERN_LENGTH_MIN } from 'modules/project/config';

interface PatternActionPayload<T> extends TrackActionPayload<T> {
    readonly pattern: number;
}
interface NoteActionPayload<T> extends PatternActionPayload<T> {
    readonly step: number;
}
type SetTrackPatternLengthAction = PayloadAction<PatternActionPayload<number>>;
type SetTrackPatternDivisionAction = PayloadAction<PatternActionPayload<PatternDivisionID>>;
type ClearTrackPatternAction = PayloadAction<TrackActionPayload<number>>;
type SetTrackPatternNotePitchAction = PayloadAction<NoteActionPayload<number>>;
type SetTrackPatternNoteVelocityAction = PayloadAction<NoteActionPayload<number>>;
type ClearTrackPatternNoteAction = PayloadAction<PatternActionPayload<number>>;

export type PatternsActions =
    SetTrackPatternLengthAction |
    SetTrackPatternDivisionAction |
    ClearTrackPatternAction |
    SetTrackPatternNotePitchAction |
    SetTrackPatternNoteVelocityAction |
    ClearTrackPatternNoteAction;

const setTrackPatternLength: ProjectReducer<SetTrackPatternLengthAction> = (state, action) => {
    const { track, pattern, data } = action.payload;
    const ptn = state.tracks[track].patterns[pattern];
    ptn.bars = limitNumber(data, PATTERN_LENGTH_MIN, PATTERN_LENGTH_MAX);
};

const setTrackPatternDivision: ProjectReducer<SetTrackPatternDivisionAction> = (state, action) => {
    const { track, pattern, data } = action.payload;
    const ptn = state.tracks[track].patterns[pattern];
    ptn.division = data;

    // remove out-of-pattern notes
    const steps = ptn.bars * ptn.division;
    ptn.notes = ptn.notes.filter(({ start }) => start <= steps - 1);

    // shorten out-of-pattern notes
    ptn.notes.forEach((note) => {
        if (note.start + note.duration > steps) {
            note.duration = steps - note.start;
        }
    });
};

const clearTrackPattern: ProjectReducer<ClearTrackPatternAction> = (state, action) => {
    const { track, data } = action.payload;
    state.tracks[track].patterns[data] = createPatternData();
};

const setTrackPatternNotePitch: ProjectReducer<SetTrackPatternNotePitchAction> = (state, action) => {
    const { track, pattern, step, data } = action.payload;
    const { notes } = state.tracks[track].patterns[pattern];
    let note = notes.find(({ start }) => step === start);

    if (!note) {
        // create note
        note = createNoteData({ start: step });
        notes.push(note);
    }
    note.pitch = limitNumber(data, PITCH_MIN, PITCH_MAX);
};

const setTrackPatternNoteVelocity: ProjectReducer<SetTrackPatternNoteVelocityAction> = (state, action) => {
    const { track, pattern, step, data } = action.payload;
    const { notes } = state.tracks[track].patterns[pattern];
    const note = notes.find(({ start }) => step === start);

    if (!note) {
        throw new Error('Could not set note velocity: Invalid note!');
    }
    note.velocity = limitNumber(data, VELOCITY_MIN, VELOCITY_MAX);
};

const clearTrackPatternNote: ProjectReducer<ClearTrackPatternNoteAction> = (state, action) => {
    const { track, pattern, data } = action.payload;
    const ptn = state.tracks[track].patterns[pattern];
    ptn.notes = ptn.notes.filter(({ start }) => start !== data);
};

export const patternsReducer = {
    setTrackPatternLength,
    setTrackPatternDivision,
    clearTrackPattern,
    setTrackPatternNotePitch,
    setTrackPatternNoteVelocity,
    clearTrackPatternNote,
};
