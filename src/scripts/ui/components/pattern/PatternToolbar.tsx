import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { sessionSlice } from 'store/session';
import { projectSlice } from 'store/project';

import { PatternData } from 'modules/project/pattern';
import { PatternDivisionID } from 'modules/project/config';

import { confirm } from 'ui/dialog';
import { Button } from 'ui/common/Button';
import { Toolbar } from 'ui/common/Toolbar';
import { BarSelector } from 'ui/components/selector/BarSelector';
import { StepSelector } from 'ui/components/selector/StepSelector';
import { PatternSelector } from 'ui/components/selector/PatternSelector';

interface Props {
    readonly track: number;
    readonly pattern: number;
    readonly patterns: PatternData[];
}

export const PatternToolbar: React.FC<Props> = ({ track, pattern, patterns }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { setPattern } = sessionSlice.actions;
    const {
        setTrackPatternLength, setTrackPatternDivision,
        clearTrackPattern,
    } = projectSlice.actions;

    const data = patterns[pattern];

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
        <Toolbar>
            <PatternSelector
                value={pattern}
                onChange={(value) => dispatch(setPattern(value))}
            />

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
    );
};
