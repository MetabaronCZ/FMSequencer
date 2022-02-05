import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyles } from 'ui/components/GlobalStyles';
import { NavigationScroll } from 'ui/components/NavigationScroll';

import { routes } from 'modules/routes';
import { defaultTheme } from 'modules/theme';

export const App: React.FC = () => (
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles />

            <BrowserRouter>
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
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);
