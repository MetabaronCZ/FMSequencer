import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { createRange } from 'core/array';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import {
    PatternDivisionID, patternDivisions,
    PATTERN_LENGTH_MAX, PATTERN_LENGTH_MIN,
} from 'modules/project/config';

import { paths } from 'ui/paths';
import { confirm } from 'ui/dialog';
import { Page } from 'ui/layout/Page';
import { getSelection } from 'ui/event';
import { Select } from 'ui/common/Select';
import { Toolkit } from 'ui/common/Toolkit';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { PatternUI } from 'ui/components/PatternUI';

const barIds = createRange(PATTERN_LENGTH_MIN, PATTERN_LENGTH_MAX);

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

    const trackValues = getSelection(tracks, (track, i) => ({
        label: track.name,
        value: i,
    }));

    const patternValues = getSelection(patterns, (pattern, i) => ({
        label: pattern.name,
        value: i,
    }));

    const barValues = getSelection(barIds, (i) => ({
        label: `${i} ${t('bar', { count: i })}`,
        value: i,
    }));

    const divisionValues = getSelection([...patternDivisions], (i) => ({
        label: `${i} ${t('perBar')}`,
        value: i,
    }));

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
            <Toolkit>
                <Select
                    value={track}
                    values={trackValues}
                    onChange={(value) => {
                        navigate(paths.PATTERN(`${value}`, '0'));
                    }}
                />

                <Select
                    value={pattern}
                    values={patternValues}
                    onChange={(value) => {
                        navigate(paths.PATTERN(`${track}`, `${value}`));
                    }}
                />

                {'|'}

                <Select
                    value={data.bars}
                    values={barValues}
                    onChange={askLength}
                />

                <Select
                    value={data.division}
                    values={divisionValues}
                    onChange={setDivision}
                />

                {'|'}

                <ButtonRaw
                    text={t('clear')}
                    onClick={clear}
                />
            </Toolkit>

            <PatternUI
                track={track}
                pattern={pattern}
                data={data}
            />
        </Page>
    );
};
