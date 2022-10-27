import { toFixedLength } from 'core/format';

import { SignatureID } from 'modules/project/config';
import { StepConfig, StepData, createStepData } from 'modules/project/step';

export interface PatternData {
  readonly name: string;
  readonly steps: StepData[];
  readonly signature: SignatureID;
  readonly bars: number;
}

export interface PatternConfig {
  readonly name?: string;
  readonly steps?: StepConfig[];
  readonly signature?: SignatureID;
  readonly bars?: number;
}

export const createPatternData = (
  id: number,
  config: PatternConfig = {}
): PatternData => {
  const steps = config.steps ?? [];
  return {
    name: config.name ?? `Pattern ${toFixedLength(id + 1, 2, '0')}`,
    signature: config.signature ?? '4/4',
    bars: config.bars ?? 1,
    steps: steps.map((item) => createStepData(item)),
  };
};

export const getSignatureData = (signature: SignatureID): [number, number] => {
  const [beats, division] = signature.split('/').map((s) => parseInt(s, 10));
  return [beats, division];
};

export const getPatternSteps = (
  pattern: PatternData,
  page: number
): StepData[] => {
  const { steps: stepsData, signature } = pattern;
  const data = [...stepsData].sort((a, b) => a.start - b.start);
  const [beats, division] = getSignatureData(signature);

  const perPage = beats * division;
  const startStep = (page - 1) * perPage;

  const steps: StepData[] = Array(perPage)
    .fill(null)
    .map((_, i) => createStepData({ start: startStep + i }));

  for (const item of data) {
    const index = steps.findIndex(({ start }) => item.start === start);

    if (index >= 0) {
      steps[index] = item;
    }
  }
  return steps;
};
