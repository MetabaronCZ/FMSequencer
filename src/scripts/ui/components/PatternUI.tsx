import React from 'react';
import styled from 'styled-components';

import { createRange } from 'core/array';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { getNoteName } from 'modules/engine/pitch';
import { getPatternSteps, PatternData } from 'modules/project/pattern';
import { PITCH_MAX, PITCH_MIN, VELOCITY_MAX, VELOCITY_MIN } from 'modules/engine/config';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { getSelectorValues, Selector } from 'ui/common/Selector';

const pitches = createRange(PITCH_MIN, PITCH_MAX);
const velocities = createRange(VELOCITY_MIN, VELOCITY_MAX);

const pitchValues = getSelectorValues(pitches, (val) => ({
    label: getNoteName(val),
    value: val,
}));

const velocityValues = getSelectorValues(velocities, (val) => ({
    label: ('000' + val).slice(-3),
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
    padding: 0 ${toVU(0.5)};
    text-align: center;
`;

const Step = styled(Cell)`
    padding-right: ${toVU(1.5)};
    text-align: right;
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
                            {`000${i + 1}`.slice(-3)}
                        </Step>

                        <Cell $highlighted={!!step}>
                            <Selector
                                value={step ? step.note.pitch : null}
                                values={pitchValues}
                                defaultValue={60}
                                placeholder="—"
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
                                : '—'
                            }
                        </Cell>
                    </tr>
                ))}
            </tbody>
        </Steps>
    );
};
