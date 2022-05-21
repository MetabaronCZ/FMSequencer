import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';

import { Header } from 'ui/layout/Header';
import { Footer } from 'ui/layout/Footer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 1280px;
    margin: 0 auto;
`;

const Content = styled.main`
    flex: 1;
    overflow-y: auto;
    padding: ${toVU(2)};
`;

export const Layout: React.FC = ({ children }) => (
    <Container>
        <header>
            <Header />
        </header>

        <Content>
            {children}
        </Content>

        <footer>
            <Footer />
        </footer>
    </Container>
);
