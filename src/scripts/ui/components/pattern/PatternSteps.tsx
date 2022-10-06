import React from 'react';
import styled from 'styled-components';

import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { stepFXIDs } from 'modules/project/config';
import { StepData } from 'modules/project/step';

import { Text } from 'ui/common/Text';
import { FXTypeSelector } from 'ui/components/selector/FXTypeSelector';
import { FXValueSelector } from 'ui/components/selector/FXValueSelector';
import { PitchSelector } from 'ui/components/selector/PitchSelector';
import { VelocitySelector } from 'ui/components/selector/VelocitySelector';
import { toVU } from 'ui/typography';

const Container = styled.ul`
  list-style-type: none;
`;

const Step = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface CellProps {
  readonly $highlighted?: boolean;
}

const Cell = styled.div<CellProps>`
  ${Text.Default};
  color: ${({ theme }) => theme.color.black};
  opacity: ${({ $highlighted }) => ($highlighted ? 1.0 : 0.5)};
  text-align: center;

  &:first-child {
    width: ${toVU(4)};
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
  readonly division: number;
  readonly steps: StepData[];
}

export const PatternSteps: React.FC<Props> = ({
  track,
  pattern,
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

  return (
    <Container>
      {steps.map((step, i) => {
        const isHighlighted = !!step.note || step.fx.some((item) => !!item);
        const stepId = step.start;
        return (
          <Step key={i}>
            <Cell $highlighted={0 === i % division}>
              {toFixedLength(stepId, 3, '0')}
            </Cell>

            <Cell $highlighted={isHighlighted}>
              <PitchSelector
                value={step.note ? step.note.pitch : null}
                placeholder="&nbsp;&ndash;&nbsp;"
                onChange={(value) => {
                  dispatch(
                    setTrackPatternStepPitch({
                      track,
                      pattern,
                      step: stepId,
                      data: value,
                    })
                  );
                }}
                onDelete={() => {
                  dispatch(
                    deleteTrackPatternStepPitch({
                      track,
                      pattern,
                      step: stepId,
                      data: null,
                    })
                  );
                }}
              />
            </Cell>

            <Cell $highlighted={isHighlighted}>
              <VelocitySelector
                value={step.note ? step.note.velocity : null}
                placeholder="&nbsp;&ndash;"
                onChange={(value) => {
                  dispatch(
                    setTrackPatternStepVelocity({
                      track,
                      pattern,
                      step: stepId,
                      data: value,
                    })
                  );
                }}
              />
            </Cell>

            <Divider />

            {stepFXIDs.map((fxID, f) => {
              const fx = step.fx[fxID];
              return (
                <React.Fragment key={fxID}>
                  <Cell $highlighted={isHighlighted}>
                    <FXTypeSelector
                      value={fx ? fx.type : null}
                      placeholder="&nbsp;&ndash;&nbsp;"
                      onChange={(value) => {
                        dispatch(
                          setTrackPatternStepFXType({
                            track,
                            pattern,
                            step: stepId,
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
                            step: stepId,
                            fx: fxID,
                            data: null,
                          })
                        );
                      }}
                    />
                  </Cell>

                  <Cell $highlighted={isHighlighted}>
                    <FXValueSelector
                      value={fx ? fx.value : null}
                      placeholder="&nbsp;&ndash;"
                      onChange={(value) => {
                        dispatch(
                          setTrackPatternStepFXValue({
                            track,
                            pattern,
                            step: stepId,
                            fx: fxID,
                            data: value,
                          })
                        );
                      }}
                    />
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
