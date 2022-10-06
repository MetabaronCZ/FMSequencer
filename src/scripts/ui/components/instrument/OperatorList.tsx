import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { OperatorData } from 'modules/project/instrument/operator';

import { Text } from 'ui/common/Text';
import { OperatorUI } from 'ui/components/instrument/OperatorUI';
import { toVU } from 'ui/typography';

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
`;

const ListItem = styled.li`
  flex: 1;
`;

const OperatorName = styled.div`
  ${Text.Heading};
  text-align: center;
  margin-bottom: ${toVU(0.5)};
`;

interface Props {
  readonly track: number;
  readonly data: OperatorData[];
}

export const OperatorList: React.FC<Props> = ({ track, data }) => {
  const { t } = useTranslation();
  return (
    <List>
      {data.map((operator, i) => {
        const isHighlighted = 0 === i % 2;
        return (
          <ListItem key={i}>
            <OperatorName>{`${t('operator')}-${i + 1}`}</OperatorName>

            <OperatorUI
              track={track}
              operator={i}
              data={operator}
              highlighted={isHighlighted}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
