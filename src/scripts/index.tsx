import React from 'react';
import { render } from 'react-dom';

import { App } from 'ui/components/App';

import { Logger } from 'modules/logger';
import { i18n } from 'modules/localization';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Could not render app: Invalid HTML structure');
}
i18n
    .then(() => {
        render(<App />, root);
    })
    .catch(Logger.error);
