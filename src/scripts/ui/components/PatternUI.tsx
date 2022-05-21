import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';
import { useAppDispatch, useAppSelector } from 'store';

import { getNoteName } from 'modules/engine/pitch';
import { getPatternSteps } from 'modules/project/pattern';
import { PatternDivisionID } from 'modules/project/config';
import { PITCH_MAX, PITCH_MIN, VELOCITY_MAX, VELOCITY_MIN } from 'modules/engine/config';

import { confirm } from 'ui/dialog';
import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { getSelection } from 'ui/event';
import { Button } from 'ui/common/Button';
import { Toolbar } from 'ui/common/Toolbar';
import { Selector } from 'ui/common/Selector';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { BarSelector } from 'ui/components/selector/BarSelector';
import { StepSelector } from 'ui/components/selector/StepSelector';
import { PatternSelector } from 'ui/components/selector/PatternSelector';

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
    color: ${({ $highlighted, theme }) => $highlighted ? theme.color.black : theme.color.grey2};
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

export const PatternUI: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { tracks } = useAppSelector((state) => state.project);
    const { track, pattern } = useAppSelector((state) => state.session);

    const { setPattern } = sessionSlice.actions;
    const {
        setTrackPatternNotePitch, setTrackPatternNoteVelocity, clearTrackPatternNote,
        setTrackPatternLength, setTrackPatternDivision, clearTrackPattern,
    } = projectSlice.actions;

    const { patterns } = tracks[track];
    const data = patterns[pattern];
    const steps = getPatternSteps(data);

    const setLength = (len: number): void => {
        dispatch(setTrackPatternLength({
            track,
            pattern,
            data: len,
        }));
    };

    const askLength = (value: number): void => {
        if (value < data.bars) {
            const ask = confirm(t('confirmPatternLengthChange'), () => setLength(value));
            ask();
        } else {
            setLength(value);
        }
    };

    const setDivision = confirm(t('confirmPatternDivisionChange'), (value: PatternDivisionID) => {
        dispatch(setTrackPatternDivision({
            track,
            pattern,
            data: value,
        }));
    });

    const clear = confirm(t('confirmPatternDelete'), () => dispatch(
        clearTrackPattern({
            track,
            data: pattern,
        })
    ));

    return (
        <Grid>
            <GridRow>
                <GridColumn>
                    <Toolbar>
                        <PatternSelector
                            value={pattern}
                            onChange={(value) => dispatch(setPattern(value))}
                        />

                        {' | '}

                        <BarSelector
                            value={data.bars}
                            onChange={askLength}
                        />

                        <StepSelector
                            value={data.division}
                            onChange={setDivision}
                        />

                        {'|'}

                        <Button
                            text={t('clear')}
                            onClick={clear}
                        />
                    </Toolbar>
                </GridColumn>
            </GridRow>

            <GridRow $size={1}>
                <GridColumn>
                    <Steps>
                        <tbody>
                            {steps.map((step, i) => (
                                <tr key={i}>
                                    <Step $highlighted={0 === i % data.division}>
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
                </GridColumn>
            </GridRow>
        </Grid>
    );
};
