import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Text } from 'ui/common/Text';
import { Actions } from 'ui/layout/Header/Actions';
import { Fields } from 'ui/layout/Header/Fields';
import { toVU } from 'ui/typography';

export interface ProjectSaveData {
  readonly data: string;
  readonly timestamp: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${toVU(2)};
  align-items: center;
  max-width: ${({ theme }) => theme.dimensions.page.width};
  padding: 0 ${toVU(2)};
  margin: 0 auto;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${toVU(2)};
  flex: 1;
`;

const Logo = styled.h1`
  ${Text.Default};
  font-weight: bold;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.grey2};
  margin-right: ${toVU(4)};
`;

export const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Panel>
        <Logo>{t('app')}</Logo>
        <Actions />
      </Panel>

      <Panel>
        <Fields />
      </Panel>

      <Panel />
    </Container>
  );
};
