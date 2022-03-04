import { PITCH_BASE, VELOCITY_MAX } from 'modules/engine/config';

export interface NoteData {
    readonly pitch: number;
    readonly velocity: number;
    readonly start: number;
    readonly duration: number;
}

export interface NoteConfig {
    readonly pitch?: number;
    readonly velocity?: number;
    readonly start?: number;
    readonly duration?: number;
}

export const createNoteData = (config: NoteConfig = {}): NoteData => {
    return {
        pitch: config.pitch ?? PITCH_BASE,
        velocity: config.velocity ?? VELOCITY_MAX,
        start: config.start ?? 0,
        duration: config.duration ?? 1,
    };
};
