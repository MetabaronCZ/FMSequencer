import { PITCH_MIN } from 'modules/engine/config';

const notes = ['A-', 'A#', 'B-', 'C-', 'C#', 'D-', 'D#', 'E-', 'F-', 'F#', 'G-', 'G#'];

export const getNoteName = (midi: number): string => {
    const noteNumber = midi - PITCH_MIN;
    const octave = Math.floor(midi / 12);
    const noteName = notes[noteNumber % 12];
    return noteName + octave;
};
