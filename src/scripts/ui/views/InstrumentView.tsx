import React from 'react';
import { useParams } from 'react-router';

import { Page } from 'ui/layout/Page';
import { Keyboard } from 'ui/components/Keyboard';
import { InstrumentUI } from 'ui/components/instrument/InstrumentUI';

export const InstrumentView: React.FC = () => {
    const { id } = useParams();
    const selectedInstrument = id ? parseInt(id) : 0;

    return (
        <Page>
            <InstrumentUI instrumentId={selectedInstrument} />
            <Keyboard />
        </Page>
    );
};
