import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';
import { useAppDispatch, useAppSelector } from 'store';

import { confirm } from 'ui/dialog';
import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { Button } from 'ui/common/Button';
import { Toolbar } from 'ui/common/Toolbar';
import { ButtonSquare } from 'ui/common/ButtonSquare';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { BarSelector } from 'ui/components/selector/BarSelector';
import { PatternSelector } from 'ui/components/selector/PatternSelector';
import { SequenceSelector } from 'ui/components/selector/SequenceSelector';

const List = styled.ul`
  list-style-type: none;
`;

const Item = styled.li`
  ${Text.Default};
  display: flex;
  gap: ${toVU(1)};
  flex-direction: row;
  align-items: center;
  padding: ${toVU(0.5)} 0;
  margin-bottom: 1px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SequenceUI: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { trackMute, trackSolo, setSequence, setTrack } = sessionSlice.actions;
  const { setSequenceTrackPattern, setSequenceLength, clearSequence } =
    projectSlice.actions;

  const { tracks: projectTracks, sequences } = useAppSelector(
    (state) => state.project
  );
  const { sequence, track, mutedTracks, soloedTrack } = useAppSelector(
    (state) => state.session
  );

  const { bars, tracks } = sequences[sequence];

  const clear = confirm(t('confirmSequenceDelete'), () =>
    dispatch(clearSequence(sequence))
  );

  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <Toolbar>
            <SequenceSelector
              value={sequence}
              onChange={(value) => {
                dispatch(
                  setSequence({
                    value,
                    pattern: sequences[value].tracks[track].pattern,
                  })
                );
              }}
            />

            <BarSelector
              value={bars}
              onChange={(value) => {
                dispatch(
                  setSequenceLength({
                    sequence,
                    data: value,
                  })
                );
              }}
            />

            {'|'}

            <Button text={t('clear')} onClick={clear} />
          </Toolbar>
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <List>
            {tracks.map(({ name, pattern }, i) => (
              <Item key={i}>
                <ButtonSquare
                  text="M"
                  title={t('mute')}
                  isActive={mutedTracks.includes(i)}
                  onClick={() => dispatch(trackMute(i))}
                />
                <ButtonSquare
                  text="S"
                  title={t('solo')}
                  isActive={i === soloedTrack}
                  onClick={() => dispatch(trackSolo(i))}
                />
                <Button
                  text={name}
                  onClick={() => {
                    dispatch(
                      setTrack({
                        value: i,
                        pattern: sequences[sequence].tracks[i].pattern,
                      })
                    );
                  }}
                  disabled={i === track}
                />
                {' > '}
                <PatternSelector
                  value={pattern}
                  onChange={(p) => {
                    dispatch(
                      setSequenceTrackPattern({
                        sequence,
                        track: i,
                        pattern: p,
                      })
                    );
                  }}
                />{' '}
                ({t('bars')}: {projectTracks[i].patterns[pattern].bars})
              </Item>
            ))}
          </List>
        </GridColumn>
      </GridRow>
    </Grid>
  );
};
