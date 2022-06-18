import React from 'react';
import { render } from 'react-dom';

import { Logger } from 'core/logger';

import { App } from 'ui/components/App';
import { i18n } from 'ui/localization';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Could not render app: Invalid HTML structure');
}
i18n
  .then(() => {
    render(<App />, root);
  })
  .catch(Logger.error);
