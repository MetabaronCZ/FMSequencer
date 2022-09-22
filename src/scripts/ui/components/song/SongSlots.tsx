import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { SongData } from 'modules/project/song';

import { Button } from 'ui/common/Button';
import { Text } from 'ui/common/Text';
import { SequenceRepeatSelector } from 'ui/components/selector/SequenceRepeatSelector';
import { SequenceSelector } from 'ui/components/selector/SequenceSelector';
import { confirm } from 'ui/dialog';
import { toVU } from 'ui/typography';

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: ${toVU(1)};
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
  gap: ${toVU(1)};
`;

const ItemColumn = styled.div`
  ${Text.Default};

  &:first-child {
    opacity: 0.5;
  }

  &:last-child {
    flex: 1;
    text-align: right;
  }
`;

interface Props {
  readonly song: SongData;
}

export const SongSlots: React.FC<Props> = ({ song }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    setSongSequence,
    setSongSequenceRepeat,
    removeSongSequence,
    moveSongSequence,
  } = projectSlice.actions;

  const moveSequence = (id: number, dir: 1 | -1): void => {
    dispatch(
      moveSongSequence({
        slot: id,
        data: id + dir,
      })
    );
  };

  const deleteSequence = confirm(
    t('confirmSongSequenceDelete'),
    (id: number) => {
      dispatch(
        removeSongSequence({
          slot: id,
          data: null,
        })
      );
    }
  );

  return (
    <List>
      {song.sequences.map(({ sequence, repeat }, i) => (
        <Item key={i}>
          <ItemColumn>{toFixedLength(i + 1, 3, '0')}</ItemColumn>

          <ItemColumn>
            <SequenceSelector
              value={sequence}
              onChange={(value) => {
                dispatch(
                  setSongSequence({
                    slot: i,
                    data: value,
                  })
                );
              }}
            />
          </ItemColumn>

          <ItemColumn>
            <SequenceRepeatSelector
              value={repeat}
              onChange={(value) => {
                dispatch(
                  setSongSequenceRepeat({
                    slot: i,
                    data: value,
                  })
                );
              }}
            />
          </ItemColumn>

          <ItemColumn>
            <Button
              text="˄"
              title={t('moveUp')}
              onClick={() => moveSequence(i, -1)}
            />

            <Button
              text="˅"
              title={t('moveDown')}
              onClick={() => moveSequence(i, +1)}
            />

            <Button
              text="×"
              title={t('delete')}
              onClick={() => deleteSequence(i)}
            />
          </ItemColumn>
        </Item>
      ))}
    </List>
  );
};
