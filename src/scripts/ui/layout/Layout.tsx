import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Footer } from 'ui/layout/Footer';
import { Header } from 'ui/layout/Header';
import { toVU } from 'ui/typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: #00050a;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${({ theme }) => theme.dimensions.page.width};
  height: ${({ theme }) => theme.dimensions.page.height};
`;

const Content = styled.main`
  flex: 1;
  min-height: 0;
  padding: ${toVU(2)};
  background: ${({ theme }) => theme.color.white};
`;

export const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <Wrapper>
    <Container>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Container>
  </Wrapper>
);
