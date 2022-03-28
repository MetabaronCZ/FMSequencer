import React from 'react';
import styled from 'styled-components';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { getNoteName } from 'modules/engine/pitch';
import { getPatternSteps, PatternData } from 'modules/project/pattern';
import { PITCH_MAX, PITCH_MIN, VELOCITY_MAX, VELOCITY_MIN } from 'modules/engine/config';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { getSelection } from 'ui/event';
import { Selector } from 'ui/common/Selector';

const pitches = createRange(PITCH_MIN, PITCH_MAX);
const velocities = createRange(VELOCITY_MIN, VELOCITY_MAX);

const pitchValues = getSelection(pitches, (val) => ({
    label: getNoteName(val),
    value: val,
}));

const velocityValues = getSelection(velocities, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

const Steps = styled.table`
    border-collapse: collapse;
`;

interface CellProps {
    readonly $highlighted?: boolean;
}
const Cell = styled.td<CellProps>`
    ${Text.Default};
    color: ${({ $highlighted, theme }) => $highlighted ? theme.color.black : theme.color.grey};
    padding-right: ${toVU(0.5)};
    text-align: center;

    &:last-child {
        padding-right: 0;
    }
`;

const Step = styled(Cell)`
    text-align: right;
    padding-right: ${toVU(1)};
`;

interface Props {
    readonly track: number;
    readonly pattern: number;
    readonly data: PatternData;
}

export const PatternUI: React.FC<Props> = ({ track, pattern, data }) => {
    const { division } = data;
    const dispatch = useAppDispatch();
    const steps = getPatternSteps(data);
    const {
        setTrackPatternNotePitch, setTrackPatternNoteVelocity,
        clearTrackPatternNote,
    } = projectSlice.actions;

    return (
        <Steps>
            <tbody>
                {steps.map((step, i) => (
                    <tr key={i}>
                        <Step $highlighted={0 === i % division}>
                            {toFixedLength(i, 3, '0')}
                        </Step>

                        <Cell $highlighted={!!step}>
                            <Selector
                                value={step ? step.note.pitch : null}
                                values={pitchValues}
                                defaultValue={60}
                                placeholder="&nbsp;&mdash;&nbsp;"
                                plain
                                onChange={(value) => dispatch(
                                    setTrackPatternNotePitch({
                                        track,
                                        pattern,
                                        step: i,
                                        data: value,
                                    })
                                )}
                                onDelete={() => dispatch(
                                    clearTrackPatternNote({
                                        track,
                                        pattern,
                                        data: i,
                                    })
                                )}
                            />
                        </Cell>

                        <Cell $highlighted={!!step}>
                            {step
                                ? (
                                    <Selector
                                        value={step.note.velocity}
                                        values={velocityValues}
                                        plain
                                        onChange={(value) => dispatch(
                                            setTrackPatternNoteVelocity({
                                                track,
                                                pattern,
                                                step: i,
                                                data: value,
                                            })
                                        )}
                                    />
                                )
                                : <>&nbsp;&mdash;&nbsp;</>
                            }
                        </Cell>
                    </tr>
                ))}
            </tbody>
        </Steps>
    );
};
