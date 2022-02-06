import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'ui/layout/Page';
import { useAppDispatch } from 'ui/store';
import { masterSlice } from 'ui/store/master';
import { Paragraph } from 'ui/common/Paragraph';
import { Keyboard } from 'ui/components/Keyboard';
import { instrumentSlice } from 'ui/store/instrument';

export const HomeView: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(masterSlice.actions.create({
            volume: 0.1,
        }));

        dispatch(instrumentSlice.actions.create({
            algorithm: 4,
            operators: [
                {},
                { ratio: 4 },
                { level: 0 },
                { level: 0 },
            ],
        }));
    }, [dispatch]);

    return (
        <Page title={t('home')}>
            <Paragraph>...</Paragraph>
            <Keyboard />
        </Page>
    );
};
