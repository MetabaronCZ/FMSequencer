import React from 'react';
import styled from 'styled-components';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import {
  PITCH_MAX,
  PITCH_MIN,
  VELOCITY_MAX,
  VELOCITY_MIN,
} from 'modules/engine/config';
import { getNoteName } from 'modules/engine/pitch';
import {
  PatternDivisionID,
  STEP_FX_VALUE_MAX,
  STEP_FX_VALUE_MIN,
  stepFXIDs,
  stepFXTypes,
} from 'modules/project/config';
import { StepData } from 'modules/project/step';

import { Selector } from 'ui/common/Selector';
import { Text } from 'ui/common/Text';
import { getSelection } from 'ui/event';
import { toVU } from 'ui/typography';

const pitches = createRange(PITCH_MIN, PITCH_MAX);
const velocities = createRange(VELOCITY_MIN, VELOCITY_MAX);
const fxs = createRange(STEP_FX_VALUE_MIN, STEP_FX_VALUE_MAX);

const pitchValues = getSelection(pitches, (val) => ({
  label: getNoteName(val),
  value: val,
}));

const velocityValues = getSelection(velocities, (val) => ({
  label: toFixedLength(val, 3),
  value: val,
}));

const fxTypeValues = getSelection([...stepFXTypes], (id) => ({
  label: `${toFixedLength(id, 3)}`,
  value: id,
}));

const fxValues = getSelection(fxs, (id) => ({
  label: `${toFixedLength(id, 3)}`,
  value: id,
}));

const Container = styled.ul`
  list-style-type: none;
`;

interface StepProps {
  readonly $isBarEnd?: boolean;
}

const Step = styled.li<StepProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme, $isBarEnd }) =>
    $isBarEnd &&
    `
      margin-bottom: ${toVU(0.5)};
      padding-bottom: ${toVU(0.5)};
      border-bottom: ${theme.border.transparent};
    `}
`;

interface CellProps {
  readonly $highlighted?: boolean;
}

const Cell = styled.div<CellProps>`
  ${Text.Default};
  width: ${toVU(4)};
  color: ${({ theme }) => theme.color.black};
  opacity: ${({ $highlighted }) => ($highlighted ? 1.0 : 0.5)};
  text-align: center;

  &:first-child {
    text-align: left;
  }
`;

const Divider = styled.div`
  width: ${toVU(1)};
`;

interface Props {
  readonly track: number;
  readonly pattern: number;
  readonly beats: number;
  readonly division: PatternDivisionID;
  readonly steps: StepData[];
}

export const PatternSteps: React.FC<Props> = ({
  track,
  pattern,
  beats,
  division,
  steps,
}) => {
  const dispatch = useAppDispatch();

  const {
    setTrackPatternStepPitch,
    deleteTrackPatternStepPitch,
    setTrackPatternStepVelocity,
    setTrackPatternStepFXType,
    setTrackPatternStepFXValue,
    deleteTrackPatternStepFX,
  } = projectSlice.actions;

  const stepsPerBar = beats * division;

  return (
    <Container>
      {steps.map((step, i) => {
        const isHighlighted = !!step.note || step.fx.some((item) => !!item);
        const isBarEnd =
          i < steps.length - 1 && stepsPerBar - 1 === i % stepsPerBar;
        return (
          <Step $isBarEnd={isBarEnd} key={i}>
            <Cell $highlighted={0 === i % division}>
              {toFixedLength(i, 3, '0')}
            </Cell>

            <Cell $highlighted={isHighlighted}>
              <Selector
                value={step.note ? step.note.pitch : null}
                values={pitchValues}
                defaultValue={60}
                shiftStep={12}
                placeholder="&nbsp;&mdash;&nbsp;"
                plain
                onChange={(value) => {
                  dispatch(
                    setTrackPatternStepPitch({
                      track,
                      pattern,
                      step: i,
                      data: value,
                    })
                  );
                }}
                onDelete={() => {
                  dispatch(
                    deleteTrackPatternStepPitch({
                      track,
                      pattern,
                      step: i,
                      data: null,
                    })
                  );
                }}
              />
            </Cell>

            <Cell $highlighted={isHighlighted}>
              {step.note ? (
                <Selector
                  value={step.note.velocity}
                  values={velocityValues}
                  plain
                  onChange={(value) => {
                    dispatch(
                      setTrackPatternStepVelocity({
                        track,
                        pattern,
                        step: i,
                        data: value,
                      })
                    );
                  }}
                />
              ) : (
                <>&nbsp;&mdash;&nbsp;</>
              )}
            </Cell>

            <Divider />

            {stepFXIDs.map((fxID, f) => {
              const fx = step.fx[fxID];
              return (
                <React.Fragment key={fxID}>
                  <Cell $highlighted={isHighlighted}>
                    <Selector
                      value={fx ? fx.type : null}
                      values={fxTypeValues}
                      defaultValue="???"
                      placeholder="&nbsp;&mdash;&nbsp;"
                      plain
                      onChange={(value) => {
                        dispatch(
                          setTrackPatternStepFXType({
                            track,
                            pattern,
                            step: i,
                            fx: fxID,
                            data: value,
                          })
                        );
                      }}
                      onDelete={() => {
                        dispatch(
                          deleteTrackPatternStepFX({
                            track,
                            pattern,
                            step: i,
                            fx: fxID,
                            data: null,
                          })
                        );
                      }}
                    />
                  </Cell>

                  <Cell $highlighted={isHighlighted}>
                    {fx ? (
                      <Selector
                        value={fx.value}
                        values={fxValues}
                        plain
                        onChange={(value) => {
                          dispatch(
                            setTrackPatternStepFXValue({
                              track,
                              pattern,
                              step: i,
                              fx: fxID,
                              data: value,
                            })
                          );
                        }}
                      />
                    ) : (
                      <>&nbsp;&mdash;&nbsp;</>
                    )}
                  </Cell>

                  {f < stepFXIDs.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </Step>
        );
      })}
    </Container>
  );
};
