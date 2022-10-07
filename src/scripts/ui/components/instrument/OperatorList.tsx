import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { OperatorData } from 'modules/project/instrument/operator';

import { Checkbox } from 'ui/common/Checkbox';
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

const OperatorHeader = styled.div`
  padding: 0 ${toVU(0.5)};
  margin-bottom: ${toVU(0.5)};
`;

interface Props {
  readonly track: number;
  readonly data: OperatorData[];
}

export const OperatorList: React.FC<Props> = ({ track, data }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setInstrumentOperatorActive } = projectSlice.actions;
  return (
    <List>
      {data.map((operator, i) => {
        const isHighlighted = 0 === i % 2;
        return (
          <ListItem key={i}>
            <OperatorHeader>
              <Checkbox
                label={`${t('operator')}-${i + 1}`}
                checked={operator.active}
                onChange={(checked) => {
                  dispatch(
                    setInstrumentOperatorActive({
                      track,
                      operator: i,
                      data: checked,
                    })
                  );
                }}
              />
            </OperatorHeader>

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
