import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { Fields } from 'ui/layout/Header/Fields';
import { Actions } from 'ui/layout/Header/Actions';

export interface ProjectSaveData {
  readonly data: string;
  readonly timestamp: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: ${({ theme }) => theme.dimensions.page.width};
  padding: 0 ${toVU(2)};
  margin: 0 auto;
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
      <Logo>{t('app')}</Logo>

      <Actions />
      <Fields />
    </Container>
  );
};
