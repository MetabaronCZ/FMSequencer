import { toFixedLength } from 'core/format';
import { PatternDivisionID } from 'modules/project/config';
import { createStepData, StepConfig, StepData } from 'modules/project/step';

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
    name: config.name ?? `Pattern ${toFixedLength(id + 1, 3, '0')}`,
    bars: config.bars ?? 1,
    beats: config.beats ?? 4,
    division: config.division ?? 4,
    steps: steps.map((item) => createStepData(item)),
  };
};

export const getPatternSteps = (pattern: PatternData): StepData[] => {
  const { steps: stepsData, beats, division, bars } = pattern;
  const data = [...stepsData].sort((a, b) => a.start - b.start);

  const steps: StepData[] = Array(bars * beats * division)
    .fill(null)
    .map(() => createStepData());

  for (const item of data) {
    steps[item.start] = item;
  }
  return steps;
};
