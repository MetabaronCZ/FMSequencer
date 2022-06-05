import { toFixedLength } from 'core/format';
import { PatternDivisionID } from 'modules/project/config';
import { createNoteData, NoteConfig, NoteData } from 'modules/project/note';

export interface PatternData {
    readonly name: string;
    readonly notes: NoteData[];
    readonly bars: number; // length in bars
    readonly division: PatternDivisionID; // number of steps in one bar
}

export interface PatternConfig {
    readonly name?: string;
    readonly notes?: NoteConfig[];
    readonly bars?: number;
    readonly division?: PatternDivisionID;
}

export const createPatternData = (id: number, config: PatternConfig = {}): PatternData => {
    const notes = config.notes ?? [];
    return {
        name: config.name ?? `Pattern ${toFixedLength(id + 1, 3, '0')}`,
        bars: config.bars ?? 4,
        division: config.division ?? 4,
        notes: notes.map((item) => createNoteData(item)),
    };
};

export interface PatternStep {
    readonly id: number;
    readonly note: NoteData;
}
export const getPatternSteps = (pattern: PatternData): Array<PatternStep | null> => {
    const { notes, bars, division } = pattern;
    const steps: Array<PatternStep | null> = Array(bars * division).fill(null);
    const data = [...notes].sort((a, b) => a.start - b.start);

    data.forEach((note, i) => {
        const { start, duration } = note;
        const last = Math.min(start + duration - 1, steps.length - 1);

        if (steps[start]) {
            throw new Error('Invalid pattern data!');
        }
        for (let j = start; j <= last; j++) {
            steps[j] = {
                id: i,
                note,
            };
        }
    });

    return steps;
};
