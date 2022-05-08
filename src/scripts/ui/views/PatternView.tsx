import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { PatternDivisionID } from 'modules/project/config';

import { paths } from 'ui/paths';
import { confirm } from 'ui/dialog';
import { Page } from 'ui/layout/Page';
import { Toolbar } from 'ui/common/Toolbar';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { PatternUI } from 'ui/components/PatternUI';
import { BarSelector } from 'ui/components/selector/BarSelector';
import { StepSelector } from 'ui/components/selector/StepSelector';
import { TrackSelector } from 'ui/components/selector/TrackSelector';
import { PatternSelector } from 'ui/components/selector/PatternSelector';

export const PatternView: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { trackId, patternId } = useParams();
    const tracks = useAppSelector((state) => state.project.tracks);
    const { setTrackPatternLength, setTrackPatternDivision, clearTrackPattern } = projectSlice.actions;

    const track = parseInt(trackId ?? '0', 10);
    const pattern = parseInt(patternId ?? '0', 10);
    const { patterns } = tracks[track];
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
        <Page>
            <Toolbar>
                <TrackSelector
                    value={track}
                    onChange={(value) => {
                        navigate(paths.PATTERN(`${value}`, '0'));
                    }}
                />

                <PatternSelector
                    value={pattern}
                    onChange={(value) => {
                        navigate(paths.PATTERN(`${track}`, `${value}`));
                    }}
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

                <ButtonRaw
                    text={t('clear')}
                    onClick={clear}
                />
            </Toolbar>

            <PatternUI
                track={track}
                pattern={pattern}
                data={data}
            />
        </Page>
    );
};
