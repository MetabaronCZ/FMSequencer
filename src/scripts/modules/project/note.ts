import { PITCH_BASE, VELOCITY_MAX } from 'modules/engine/config';

export interface NoteData {
    readonly pitch: number;
    readonly velocity: number;
    readonly start: number;
    readonly duration: number;
}
const defaults: NoteData = {
    pitch: PITCH_BASE,
    velocity: VELOCITY_MAX,
    start: 0,
    duration: 1,
};

export interface NoteConfig {
    readonly pitch?: number;
    readonly velocity?: number;
    readonly start?: number;
    readonly duration?: number;
}

export const createNoteData = (config: NoteConfig = {}): NoteData => {
    return Object.assign({}, defaults, config);
};
