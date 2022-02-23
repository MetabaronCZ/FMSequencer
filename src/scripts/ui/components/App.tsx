import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { store } from 'store';

import { routes } from 'ui/routes';
import { defaultTheme } from 'ui/theme';
import { GlobalStyles } from 'ui/components/GlobalStyles';
import { NavigationScroll } from 'ui/components/NavigationScroll';

export const App: React.FC = () => (
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyles />

                <MemoryRouter>
                    <NavigationScroll />

                    <Routes>
                        {routes.map((route, i) => (
                            <Route
                                path={route.path}
                                element={<route.component />}
                                key={i}
                            />
                        ))}
                    </Routes>
                </MemoryRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
