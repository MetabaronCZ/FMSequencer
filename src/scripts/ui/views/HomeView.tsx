import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'ui/layout/Page';
import { Paragraph } from 'ui/common/Paragraph';
import { Keyboard } from 'ui/components/Keyboard';

export const HomeView: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Page title={t('home')}>
            <Paragraph>...</Paragraph>
            <Keyboard />
        </Page>
    );
};
