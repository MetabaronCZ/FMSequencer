import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { createRange } from 'core/array';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { PatternDivisionID, patternDivisions, PATTERN_LENGTH_MAX, PATTERN_LENGTH_MIN } from 'modules/project/config';

import { paths } from 'ui/paths';
import { Page } from 'ui/layout/Page';
import { Heading } from 'ui/common/Heading';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { PatternUI } from 'ui/components/PatternUI';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';
import { confirm } from 'ui/dialog';

const barValues = createRange(PATTERN_LENGTH_MIN, PATTERN_LENGTH_MAX);

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

    const trackOptions = createSelectOptions(tracks, (track, i) => ({
        label: track.name,
        value: `${i}`,
    }));

    const patternOptions = createSelectOptions(patterns, (pattern, i) => ({
        label: `${t('pattern')} ${i + 1}`,
        value: `${i}`,
    }));

    const barOptions = createSelectOptions(barValues, (i) => ({
        label: `${i} ${t('bar', { count: i })}`,
        value: `${i}`,
    }));

    const divisionOptions = createSelectOptions([...patternDivisions], (i) => ({
        label: `${i} ${t('perBar')}`,
        value: `${i}`,
    }));

    const setLength = (len: number): void => {
        dispatch(setTrackPatternLength({
            track,
            pattern,
            data: len,
        }));
    };

    const askLength = (value: string): void => {
        const newLength = parseInt(value, 10);

        if (newLength < data.bars) {
            const ask = confirm(t('confirmPatternLengthChange'), () => setLength(newLength));
            ask();
        } else {
            setLength(newLength);
        }
    };

    const setDivision = confirm(t('confirmPatternDivisionChange'), (value: string) => {
        dispatch(setTrackPatternDivision({
            track,
            pattern,
            data: parseInt(value, 10) as PatternDivisionID,
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
            <Heading tag="h2" size="default">
                <SelectRaw
                    value={`${track}`}
                    options={trackOptions}
                    onChange={(value) => {
                        navigate(paths.PATTERN(value, '0'));
                    }}
                />

                {' '}

                <SelectRaw
                    value={`${pattern}`}
                    options={patternOptions}
                    onChange={(value) => {
                        navigate(paths.PATTERN(`${track}`, value));
                    }}
                />

                {' | '}

                <SelectRaw
                    value={`${data.bars}`}
                    options={barOptions}
                    onChange={askLength}
                />

                {' '}

                <SelectRaw
                    value={`${data.division}`}
                    options={divisionOptions}
                    onChange={setDivision}
                />

                {' '}

                <ButtonRaw
                    text={t('clear')}
                    onClick={clear}
                />
            </Heading>

            <PatternUI
                track={track}
                pattern={pattern}
                data={data}
            />
        </Page>
    );
};
