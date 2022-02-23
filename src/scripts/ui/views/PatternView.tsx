import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { useAppSelector } from 'store';

import { paths } from 'ui/paths';
import { Page } from 'ui/layout/Page';
import { Heading } from 'ui/common/Heading';
import { Paragraph } from 'ui/common/Paragraph';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';

export const PatternView: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { trackId, patternId } = useParams();
    const tracks = useAppSelector((state) => state.project.tracks);

    const track = trackId ? parseInt(trackId) : 0;
    const { patterns } = tracks[track];
    const pattern = patternId ? parseInt(patternId) : 0;

    const trackOptions = createSelectOptions(tracks, (track, i) => ({
        label: `${t('track')} ${i + 1}`,
        value: `${i}`,
    }));

    const patternOptions = createSelectOptions(patterns, (track, i) => ({
        label: `${t('pattern')} ${i + 1}`,
        value: `${i}`,
    }));

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
                        navigate(paths.PATTERN(`${pattern}`, value));
                    }}
                />
            </Heading>

            <pre>
                <Paragraph>
                    {JSON.stringify(patterns[pattern], null, '\t')}
                </Paragraph>
            </pre>
        </Page>
    );
};
