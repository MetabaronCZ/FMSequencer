import React from 'react';

import { useAppSelector } from 'store';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { SongSlots } from 'ui/components/song/SongSlots';
import { SongToolbar } from 'ui/components/song/SongToolbar';

export const SongUI: React.FC = () => {
  const { song } = useAppSelector((state) => state.project);
  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <SongToolbar song={song} />
        </GridColumn>
      </GridRow>

      {song.sequences.length > 0 && (
        <GridRow $size={1}>
          <GridColumn>
            <SongSlots song={song} />
          </GridColumn>
        </GridRow>
      )}
    </Grid>
  );
};
