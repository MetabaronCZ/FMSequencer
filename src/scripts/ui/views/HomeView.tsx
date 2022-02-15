import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { masterSlice } from 'store/master';
import { instrumentSlice } from 'store/instrument';

import { Page } from 'ui/layout/Page';
import { MasterUI } from 'ui/components/MasterUI';
import { Keyboard } from 'ui/components/Keyboard';
import { InstrumentUI } from 'ui/components/instrument/InstrumentUI';

export const HomeView: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(masterSlice.actions.setLevel(10));

        dispatch(instrumentSlice.actions.create({
            id: 0,
            data: {
                name: 'Test instrument',
                algorithm: 4,
                operators: [
                    {},
                    { ratio: '4' },
                    { level: 0 },
                    { level: 0 },
                ],
            },
        }));
    }, [dispatch]);

    return (
        <Page title={t('home')}>
            <MasterUI />
            <InstrumentUI instrumentId={0} />
            <Keyboard />
        </Page>
    );
};
