import { toFixedLength } from 'core/format';

import { PatternDivisionID } from 'modules/project/config';
import { StepConfig, StepData, createStepData } from 'modules/project/step';

export interface PatternData {
  readonly name: string;
  readonly steps: StepData[];
  readonly bars: number; // number of bars
  readonly beats: number; // number of beats in a bar
  readonly division: PatternDivisionID; // number of steps in one beat
}

export interface PatternConfig {
  readonly name?: string;
  readonly steps?: StepConfig[];
  readonly bars?: number;
  readonly beats?: number;
  readonly division?: PatternDivisionID;
}

export const createPatternData = (
  id: number,
  config: PatternConfig = {}
): PatternData => {
  const steps = config.steps ?? [];
  return {
    name: config.name ?? `Pattern ${toFixedLength(id + 1, 2, '0')}`,
    bars: config.bars ?? 1,
    beats: config.beats ?? 4,
    division: config.division ?? 4,
    steps: steps.map((item) => createStepData(item)),
  };
};

export const getPatternSteps = (
  pattern: PatternData,
  page: number
): StepData[] => {
  const { steps: stepsData, beats, division } = pattern;
  const data = [...stepsData].sort((a, b) => a.start - b.start);
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
