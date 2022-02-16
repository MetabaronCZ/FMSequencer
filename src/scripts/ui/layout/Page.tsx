import React from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/typography';

import { Header } from 'ui/layout/Header';
import { Footer } from 'ui/layout/Footer';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 980px;
    margin: 0 auto;
`;

const LayoutHeader = styled.header`
    padding: 0 0 ${toVU(2)};
`;

const LayoutContent = styled.main`
    flex: 1;
`;

const LayoutFooter = styled.footer`
    padding: ${toVU(2)} 0;
`;

export const Page: React.FC = ({ children }) => (
    <Layout>
        <LayoutHeader>
            <Header />
        </LayoutHeader>

        <LayoutContent>
            {children}
        </LayoutContent>

        <LayoutFooter>
            <Footer />
        </LayoutFooter>
    </Layout>
);
