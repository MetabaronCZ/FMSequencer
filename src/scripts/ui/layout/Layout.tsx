import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';

import { Header } from 'ui/layout/Header';
import { Footer } from 'ui/layout/Footer';
import { Content } from 'ui/layout/Content';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const LayoutHeader = styled.header`
    padding: ${toVU(1)} 0;
    background: ${({ theme }) => theme.color.black};
`;

const LayoutContent = styled.main`
    flex: 1;
    padding: ${toVU(2)} 0;
`;

const LayoutFooter = styled.footer`
    padding: ${toVU(1)} 0;
    background: ${({ theme }) => theme.color.black};
`;

export const Layout: React.FC = ({ children }) => (
    <Container>
        <LayoutHeader>
            <Header />
        </LayoutHeader>

        <LayoutContent>
            <Content>{children}</Content>
        </LayoutContent>

        <LayoutFooter>
            <Footer />
        </LayoutFooter>
    </Container>
);