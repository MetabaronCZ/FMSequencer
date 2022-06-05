import React from 'react';
import styled from 'styled-components';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { getNoteName } from 'modules/engine/pitch';
import { PatternStep } from 'modules/project/pattern';
import { PatternDivisionID } from 'modules/project/config';
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
    width: ${toVU(4)};
    color: ${({ $highlighted, theme }) => $highlighted ? theme.color.black : theme.color.grey2};
    text-align: center;

    &:first-child {
        text-align: left;
    }
`;

const Divider = styled.div`
    &::before {
        ${Text.Default};
        content: '|';
        color: ${({ theme }) => theme.color.grey1};
    }
`;

interface Props {
    readonly track: number;
    readonly pattern: number;
    readonly division: PatternDivisionID;
    readonly steps: Array<PatternStep | null>;
}

export const PatternSteps: React.FC<Props> = ({ track, pattern, division, steps }) => {
    const dispatch = useAppDispatch();

    const {
        setTrackPatternNotePitch, setTrackPatternNoteVelocity, clearTrackPatternNote,
    } = projectSlice.actions;

    return (
        <Container>
            {steps.map((step, i) => (
                <Step key={i}>
                    <Cell $highlighted={0 === i % division}>
                        {toFixedLength(i, 3, '0')}
                    </Cell>

                    <Divider />

                    <Cell $highlighted={!!step}>
                        <Selector
                            value={step ? step.note.pitch : null}
                            values={pitchValues}
                            defaultValue={60}
                            shiftStep={12}
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

                    <Divider />

                    <Cell $highlighted={!!step}>&nbsp;&mdash;&nbsp;</Cell>
                    <Cell $highlighted={!!step}>&nbsp;&mdash;&nbsp;</Cell>

                    <Divider />

                    <Cell $highlighted={!!step}>&nbsp;&mdash;&nbsp;</Cell>
                    <Cell $highlighted={!!step}>&nbsp;&mdash;&nbsp;</Cell>

                    <Divider />

                    <Cell $highlighted={!!step}>&nbsp;&mdash;&nbsp;</Cell>
                    <Cell $highlighted={!!step}>&nbsp;&mdash;&nbsp;</Cell>
                </Step>
            ))}
        </Container>
    );
};
