import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { useAppSelector } from 'store';

import { paths } from 'ui/paths';
import { Page } from 'ui/layout/Page';
import { Heading } from 'ui/common/Heading';
import { Paragraph } from 'ui/common/Paragraph';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';

export const SequenceView: React.FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const sequences = useAppSelector((state) => state.project.sequences);
    const sequence = id ? parseInt(id) : 0;

    const seqOptions = createSelectOptions(sequences, (seq, i) => ({
        label: `${t('sequence')} ${i + 1}`,
        value: `${i}`,
    }));

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
            </Heading>

            <pre>
                <Paragraph>
                    {JSON.stringify(sequences[sequence], null, '\t')}
                </Paragraph>
            </pre>
        </Page>
    );
};
