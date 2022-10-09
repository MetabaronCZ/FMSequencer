import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { SongData } from 'modules/project/song';

import { IcoButton } from 'ui/common/IcoButton';
import { Text } from 'ui/common/Text';
import { Confirm } from 'ui/components/modals/Confirm';
import { SequenceRepeatSelector } from 'ui/components/selector/SequenceRepeatSelector';
import { SequenceSelector } from 'ui/components/selector/SequenceSelector';
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
  const [deleteID, setDeleteID] = useState<number | null>(null);

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

  return (
    <>
      <List>
        {song.sequences.map(({ sequence, repeat }, i) => (
          <Item key={i}>
            <ItemColumn>{toFixedLength(i + 1, 2, '0')}</ItemColumn>

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
              {song.sequences.length > 1 && (
                <>
                  <IcoButton
                    ico="arrowDown"
                    title={t('moveDown')}
                    onClick={() => moveSequence(i, +1)}
                  />
                  <IcoButton
                    ico="arrowUp"
                    title={t('moveUp')}
                    onClick={() => moveSequence(i, -1)}
                  />
                </>
              )}

              <IcoButton
                ico="cross"
                title={t('delete')}
                onClick={() => setDeleteID(i)}
              />
            </ItemColumn>
          </Item>
        ))}
      </List>

      {null !== deleteID && (
        <Confirm
          text={t('confirmSongSequenceDelete')}
          onClose={() => setDeleteID(null)}
          onConfirm={() => {
            dispatch(
              removeSongSequence({
                slot: deleteID,
                data: null,
              })
            );
          }}
        />
      )}
    </>
  );
};
