import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import { limitNumber } from 'core/number';

import { PatternActionPayload } from 'store/patterns';
import { ProjectReducer } from 'store/project';

import {
  PITCH_MAX,
  PITCH_MIN,
  VELOCITY_MAX,
  VELOCITY_MIN,
} from 'modules/engine/config';
import {
  STEP_FX_VALUE_MAX,
  STEP_FX_VALUE_MIN,
  StepFXID,
  StepFXType,
} from 'modules/project/config';
import { StepFXData, createStepFXData } from 'modules/project/fx';
import { createNoteData } from 'modules/project/note';
import { createStepData } from 'modules/project/step';

interface StepActionPayload<T> extends PatternActionPayload<T> {
  readonly step: number;
}
interface StepFXActionPayload<T> extends StepActionPayload<T> {
  readonly fx: StepFXID;
}
type SetTrackPatternStepPitchAction = PayloadAction<StepActionPayload<number>>;
type DeleteTrackPatternStepPitchAction = PayloadAction<StepActionPayload<null>>;
type SetTrackPatternStepVelocityAction = PayloadAction<
  StepActionPayload<number>
>;
type SetTrackPatternStepFXTypeAction = PayloadAction<
  StepFXActionPayload<StepFXType>
>;
type SetTrackPatternStepFXValueAction = PayloadAction<
  StepFXActionPayload<number>
>;
type DeleteTrackPatternStepFXAction = PayloadAction<StepFXActionPayload<null>>;

export type StepsActions =
  | SetTrackPatternStepPitchAction
  | DeleteTrackPatternStepPitchAction
  | SetTrackPatternStepVelocityAction
  | SetTrackPatternStepFXTypeAction
  | SetTrackPatternStepFXValueAction
  | DeleteTrackPatternStepFXAction;

const setTrackPatternStepPitch: ProjectReducer<
  SetTrackPatternStepPitchAction
> = (state, action) => {
  const { track, pattern, step, data } = action.payload;
  const { steps } = state.tracks[track].patterns[pattern];
  let stepData = steps.find(({ start }) => step === start);

  if (!stepData) {
    // create step
    stepData = createStepData({ start: step });
    steps.push(stepData);
  }
  stepData.note = stepData.note ?? createNoteData();
  stepData.note.pitch = limitNumber(data, PITCH_MIN, PITCH_MAX);
};

const deleteTrackPatternStepPitch: ProjectReducer<
  DeleteTrackPatternStepPitchAction
> = (state, action) => {
  const { track, pattern, step } = action.payload;
  const { steps } = state.tracks[track].patterns[pattern];
  const stepData = steps.find(({ start }) => step === start);

  if (!stepData) {
    throw new Error('Could not delete step pitch: Invalid step!');
  }
  stepData.note = null;
};

const setTrackPatternStepVelocity: ProjectReducer<
  SetTrackPatternStepVelocityAction
> = (state, action) => {
  const { track, pattern, step, data } = action.payload;
  const { steps } = state.tracks[track].patterns[pattern];
  const stepData = steps.find(({ start }) => step === start);

  if (!stepData) {
    throw new Error('Could not set step velocity: Invalid step!');
  }
  stepData.note = stepData.note ?? createNoteData();
  stepData.note.velocity = limitNumber(data, VELOCITY_MIN, VELOCITY_MAX);
};

const setTrackPatternStepFXType: ProjectReducer<
  SetTrackPatternStepFXTypeAction
> = (state, action) => {
  const { track, pattern, step, fx, data } = action.payload;
  const { steps } = state.tracks[track].patterns[pattern];
  let stepData = steps.find(({ start }) => step === start);

  if (!stepData) {
    // create step
    stepData = createStepData({ start: step });
    steps.push(stepData);
  }
  const fxData =
    stepData.fx[fx] ?? (createStepFXData() as WritableDraft<StepFXData>);
  fxData.type = data;
  stepData.fx[fx] = fxData;
};

const setTrackPatternStepFXValue: ProjectReducer<
  SetTrackPatternStepFXValueAction
> = (state, action) => {
  const { track, pattern, step, fx, data } = action.payload;
  const { steps } = state.tracks[track].patterns[pattern];
  let stepData = steps.find(({ start }) => step === start);

  if (!stepData) {
    // create step
    stepData = createStepData({ start: step });
    steps.push(stepData);
  }
  const fxData =
    stepData.fx[fx] ?? (createStepFXData() as WritableDraft<StepFXData>);
  fxData.value = limitNumber(data, STEP_FX_VALUE_MIN, STEP_FX_VALUE_MAX);
  stepData.fx[fx] = fxData;
};

const deleteTrackPatternStepFX: ProjectReducer<
  DeleteTrackPatternStepFXAction
> = (state, action) => {
  const { track, pattern, step, fx } = action.payload;
  const { steps } = state.tracks[track].patterns[pattern];
  const stepData = steps.find(({ start }) => step === start);

  if (!stepData) {
    throw new Error('Could not set step FX: Invalid step!');
  }
  stepData.fx[fx] = null;
};

export const stepsReducer = {
  setTrackPatternStepPitch,
  deleteTrackPatternStepPitch,
  setTrackPatternStepVelocity,
  setTrackPatternStepFXType,
  setTrackPatternStepFXValue,
  deleteTrackPatternStepFX,
};
