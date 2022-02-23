import React from 'react';

import { useAppSelector } from 'store';

import { Page } from 'ui/layout/Page';
import { Paragraph } from 'ui/common/Paragraph';

export const ProjectView: React.FC = () => {
    const { name, description, tempo } = useAppSelector((state) => state.project);
    return (
        <Page>
            <Paragraph>
                <strong>Name:</strong> {name}
                <br />
                <strong>Description:</strong> {description || '-'}
                <br />
                <strong>Tempo:</strong> {tempo} BPM
            </Paragraph>
        </Page>
    );
};
