import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'ui/layout/Page';
import { Paragraph } from 'ui/common/Paragraph';

export const ErrorView: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Page title={t('error')}>
            <Paragraph>...</Paragraph>
        </Page>
    );
};
