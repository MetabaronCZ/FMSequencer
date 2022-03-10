import { createNoteData, NoteConfig, NoteData } from 'modules/project/note';

export interface PatternData {
    readonly notes: NoteData[];
    readonly bars: number; // length in bars
    readonly division: number; // number of steps in one bar
}

export interface PatternConfig {
    readonly notes?: NoteConfig[];
    readonly bars?: number;
    readonly division?: number;
}

export const createPatternData = (config: PatternConfig = {}): PatternData => {
    const notes = config.notes ?? [];
    return {
        bars: config.bars ?? 4,
        division: config.division ?? 4,
        notes: notes.map((item) => createNoteData(item)),
    };
};
