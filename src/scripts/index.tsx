import React from 'react';
import { createRoot } from 'react-dom/client';

import { Logger } from 'core/logger';

import { App } from 'ui/components/App';
import { i18n } from 'ui/localization';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Could not render app: Invalid HTML structure');
}
i18n
  .then(() => {
    const root = createRoot(container);
    root.render(<App />);
  })
  .catch(Logger.error);
