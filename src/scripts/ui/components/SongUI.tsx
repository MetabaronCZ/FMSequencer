import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import {
  SEQUENCE_LENGTH_MIN,
  SEQUENCE_REPEAT_MAX,
  SONG_LENGTH_MAX,
} from 'modules/project/config';

import { confirm } from 'ui/dialog';
import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { getSelection } from 'ui/event';
import { Button } from 'ui/common/Button';
import { Toolbar } from 'ui/common/Toolbar';
import { Selector } from 'ui/common/Selector';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { SequenceSelector } from 'ui/components/selector/SequenceSelector';

const repeats = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX);

const repeatValues = getSelection(repeats, (val) => ({
  label: toFixedLength(val, 3),
  value: val,
}));

const Slots = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: ${toVU(1)};
`;

const SlotItem = styled.li`
  display: flex;
  flex-direction: row;
  gap: ${toVU(1)};
`;

const SlotItemColumn = styled.div`
  ${Text.Default};

  &:first-child {
    opacity: 0.5;
  }
`;

export const SongUI: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { song } = useAppSelector((state) => state.project);

  const {
    clearSong,
    setSongSequence,
    setSongSequenceRepeat,
    addSongSequence,
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

  const clear = confirm(t('confirmSongClear'), () => {
    dispatch(clearSong());
  });

  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <Toolbar>
            {t('song')}

            {' | '}

            {song.sequences.length < SONG_LENGTH_MAX && (
              <Button
                text={t('insert')}
                onClick={() => dispatch(addSongSequence())}
              />
            )}

            <Button text={t('clear')} onClick={clear} />
          </Toolbar>
        </GridColumn>
      </GridRow>

      {song.sequences.length > 0 && (
        <GridRow $size={1}>
          <GridColumn>
            <Slots>
              {song.sequences.map(({ sequence, repeat }, i) => (
                <SlotItem key={i}>
                  <SlotItemColumn>
                    {toFixedLength(i + 1, 3, '0')}
                  </SlotItemColumn>

                  <SlotItemColumn>
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
                  </SlotItemColumn>

                  <SlotItemColumn>
                    {'×'}

                    <Selector
                      value={repeat}
                      values={repeatValues}
                      onChange={(value) => {
                        dispatch(
                          setSongSequenceRepeat({
                            slot: i,
                            data: value,
                          })
                        );
                      }}
                    />
                  </SlotItemColumn>

                  <SlotItemColumn>{' | '}</SlotItemColumn>

                  <SlotItemColumn>
                    <Button
                      text="▲"
                      title={t('moveUp')}
                      onClick={() => moveSequence(i, -1)}
                    />
                  </SlotItemColumn>

                  <SlotItemColumn>
                    <Button
                      text="▼"
                      title={t('moveDown')}
                      onClick={() => moveSequence(i, +1)}
                    />
                  </SlotItemColumn>

                  <SlotItemColumn>
                    <Button
                      text={t('delete')}
                      onClick={() => deleteSequence(i)}
                    />
                  </SlotItemColumn>
                </SlotItem>
              ))}
            </Slots>
          </GridColumn>
        </GridRow>
      )}
    </Grid>
  );
};
