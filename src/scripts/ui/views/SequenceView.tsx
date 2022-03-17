import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { createRange } from 'core/array';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { SEQUENCE_LENGTH_MAX, SEQUENCE_LENGTH_MIN } from 'modules/project/config';

import { paths } from 'ui/paths';
import { Page } from 'ui/layout/Page';
import { Heading } from 'ui/common/Heading';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { SequenceUI } from 'ui/components/sequence/SequenceUI';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';

const barValues = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_LENGTH_MAX);

export const SequenceView: React.FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const sequences = useAppSelector((state) => state.project.sequences);
    const { setSequenceLength, clearSequence } = projectSlice.actions;

    const sequence = id ? parseInt(id, 10) : 0;
    const { bars } = sequences[sequence];

    const seqOptions = createSelectOptions(sequences, (seq, i) => ({
        label: seq.name,
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

    const clear = (): void => {
        if (!window.confirm(t('confirmSequenceDelete'))) {
            return;
        }
        dispatch(clearSequence(sequence));
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

                {' | '}

                <SelectRaw
                    value={`${bars}`}
                    options={barOptions}
                    onChange={setLength}
                />

                {' '}

                <ButtonRaw
                    text={t('clear')}
                    onClick={clear}
                />
            </Heading>

            <SequenceUI
                sequence={sequence}
                data={sequences[sequence]}
            />
        </Page>
    );
};
