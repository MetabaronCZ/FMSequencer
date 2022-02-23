import React from 'react';

import { useAppSelector } from 'store';

import { Page } from 'ui/layout/Page';
import { Paragraph } from 'ui/common/Paragraph';

export const SongView: React.FC = () => {
    const song = useAppSelector((state) => state.project.song);
    return (
        <Page>
            <pre>
                <Paragraph>
                    {JSON.stringify(song, null, '\t')}
                </Paragraph>
            </pre>
        </Page>
    );
};
