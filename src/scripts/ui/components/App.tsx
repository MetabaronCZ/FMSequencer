import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { store } from 'store';

import { GlobalStyles } from 'ui/components/GlobalStyles';
import { View } from 'ui/components/View';
import { Layout } from 'ui/layout/Layout';
import { defaultTheme } from 'ui/theme';

export const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Layout>
          <View />
        </Layout>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
