import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Text } from 'ui/common/Text';
import { Actions } from 'ui/layout/Header/Actions';
import { Fields } from 'ui/layout/Header/Fields';
import { PlaybackUI } from 'ui/layout/Header/PlaybackUI';
import { toVU } from 'ui/typography';

export interface ProjectSaveData {
  readonly data: string;
  readonly timestamp: string;
}

const Container = styled.header`
  display: flex;
  flex-direction: row;
  gap: ${toVU(2)};
  align-items: center;
  padding: ${toVU(1)} ${toVU(2)};
  background: ${({ theme }) => theme.color.black};
`;

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${toVU(2)};
  flex: 1;

  &:last-child {
    justify-content: right;
  }
`;

const Logo = styled.h1`
  ${Text.Heading};
  flex: 1;
  letter-spacing: 4px;
  color: ${({ theme }) => theme.color.grey2};
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

      <Panel>
        <PlaybackUI />
      </Panel>
    </Container>
  );
};
