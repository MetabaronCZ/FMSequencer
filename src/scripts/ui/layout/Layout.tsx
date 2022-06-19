import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Content } from 'ui/layout/Content';
import { Footer } from 'ui/layout/Footer';
import { Header } from 'ui/layout/Header';
import { toVU } from 'ui/typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${({ theme }) => theme.color.white};
`;

const LayoutHeader = styled.header`
  padding: ${toVU(1)} 0;
  background: ${({ theme }) => theme.color.black};
`;

const LayoutContent = styled.main`
  flex: 1;
  min-height: 0; /* fix layout oveflow */
  padding: ${toVU(2)} 0;
`;

const LayoutFooter = styled.footer`
  padding: ${toVU(1)} 0;
  background: ${({ theme }) => theme.color.black};
`;

export const Layout: React.FC<PropsWithChildren> = ({ children }) => (
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
