import { createNoteData, NoteConfig, NoteData } from 'modules/project/note';

export interface PatternData {
    readonly notes: NoteData[];
    readonly bars: number; // length in bars
    readonly division: number; // number of steps in one bar
}
const defaults: PatternData = {
    notes: [],
    bars: 4,
    division: 4,
};

export interface PatternConfig {
    readonly notes?: NoteConfig[];
    readonly bars?: number;
    readonly division?: number;
}

export const createPatternData = (config: PatternConfig = {}): PatternData => {
    return {
        ...Object.assign({}, defaults, config),
        notes: config.notes
            ? config.notes.map((item) => createNoteData(item))
            : defaults.notes,
    };
};
