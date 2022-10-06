import { StepFXType } from 'modules/project/config';

export interface StepFXData {
  readonly type: StepFXType;
  readonly value: number;
}

export interface StepFXConfig {
  readonly type?: StepFXType;
  readonly value?: number;
}

export const createStepFXData = (config: StepFXConfig = {}): StepFXData => {
  return {
    type: config.type ?? '???',
    value: config.value ?? 80,
  };
};
