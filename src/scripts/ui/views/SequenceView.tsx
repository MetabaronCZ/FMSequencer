import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { getSequenceName } from 'modules/project/sequence';
import { SEQUENCE_LENGTH_MAX, SEQUENCE_LENGTH_MIN } from 'modules/project/config';

import { paths } from 'ui/paths';
import { Page } from 'ui/layout/Page';
import { Heading } from 'ui/common/Heading';
import { SequenceUI } from 'ui/components/sequence/SequenceUI';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';

export const SequenceView: React.FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const sequences = useAppSelector((state) => state.project.sequences);
    const { setSequenceLength } = projectSlice.actions;
    const sequence = id ? parseInt(id, 10) : 0;
    const { bars } = sequences[sequence];

    const barValues = Array(SEQUENCE_LENGTH_MAX).fill(0)
        .map((bar, i) => SEQUENCE_LENGTH_MIN + i);

    const seqOptions = createSelectOptions(sequences, (seq, i) => ({
        label: getSequenceName(t, i),
        value: `${i}`,
    }));

    const barOptions = createSelectOptions(barValues, (i) => ({
        label: `${i} ${t('bar', { count: i })}`,
        value: `${i}`,
    }));

    const setLength = (value: string): void => {
        const newLength = parseInt(value, 10);

        if (newLength < bars && !window.confirm(t('confirmSequenceLengthChange'))) {
            return;
        }
        dispatch(setSequenceLength({
            sequence,
            data: newLength,
        }));
    };

    return (
        <Page>
            <Heading tag="h2" size="default">
                <SelectRaw
                    value={`${sequence}`}
                    options={seqOptions}
                    onChange={(value) => {
                        navigate(paths.SEQUENCE(value));
                    }}
                />
                {' '}
                <SelectRaw
                    value={`${bars}`}
                    options={barOptions}
                    onChange={setLength}
                />
            </Heading>

            <SequenceUI
                sequence={sequence}
                data={sequences[sequence]}
            />
        </Page>
    );
};
