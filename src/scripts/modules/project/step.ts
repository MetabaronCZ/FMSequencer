import { createNoteData, NoteConfig, NoteData } from 'modules/project/note';
import { StepFXData, StepFXConfig, createStepFXData } from 'modules/project/fx';

type StepFXListData = [StepFXData | null, StepFXData | null, StepFXData | null];
type StepFXListConfig = [StepFXConfig | null, StepFXConfig | null, StepFXConfig | null];

export interface StepData {
    readonly start: number;
    readonly note: NoteData | null;
    readonly fx: StepFXListData;
}

export interface StepConfig {
    readonly start?: number;
    readonly note?: NoteConfig;
    readonly fx?: StepFXListConfig;
}

export const createStepData = (config: StepConfig = {}): StepData => {
    const fx = config.fx ?? [null, null, null];
    return {
        start: config.start ?? 0,
        note: config.note ? createNoteData(config.note) : null,
        fx: [
            fx[0] ? createStepFXData(fx[0]) : null,
            fx[1] ? createStepFXData(fx[1]) : null,
            fx[2] ? createStepFXData(fx[2]) : null,
        ],
    };
};
