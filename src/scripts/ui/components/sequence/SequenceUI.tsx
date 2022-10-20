import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';

import { Button } from 'ui/common/Button';
import { ButtonSquare } from 'ui/common/ButtonSquare';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { Text } from 'ui/common/Text';
import { PatternSelector } from 'ui/components/selector/PatternSelector';
import { SequenceToolbar } from 'ui/components/sequence/SequenceToolbar';
import { toVU } from 'ui/typography';

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: ${toVU(0.5)};
`;

const Item = styled.li`
  ${Text.Default};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(0.5)};
`;

export const SequenceUI: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { trackMute, trackSolo, setTrack } = sessionSlice.actions;
  const { setSequenceTrackPattern } = projectSlice.actions;

  const { tracks: projectTracks, sequences } = useAppSelector(
    (state) => state.project
  );
  const { sequence, track, mutedTracks, soloedTrack } = useAppSelector(
    (state) => state.session
  );

  const { bars, tracks } = sequences[sequence];

  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <SequenceToolbar bars={bars} />
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
                />
                {' | '}
                {t('bars')}: {projectTracks[i].patterns[pattern].bars}
              </Item>
            ))}
          </List>
        </GridColumn>
      </GridRow>
    </Grid>
  );
};
