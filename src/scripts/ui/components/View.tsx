import React from 'react';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { InstrumentUI } from 'ui/components/instrument/InstrumentUI';
import { PatternUI } from 'ui/components/pattern/PatternUI';
import { SequenceUI } from 'ui/components/sequence/SequenceUI';
import { SongUI } from 'ui/components/song/SongUI';

export const View: React.FC = () => (
  <Grid $gap={2}>
    <GridRow $gap={2} $size={1}>
      <GridColumn>
        <Grid>
          <GridRow>
            <GridColumn>
              <SequenceUI />
            </GridColumn>
          </GridRow>

          <GridRow />

          <GridRow $size={1}>
            <GridColumn>
              <SongUI />
            </GridColumn>
          </GridRow>
        </Grid>
      </GridColumn>

      <GridColumn>
        <PatternUI />
      </GridColumn>

      <GridColumn>
        <InstrumentUI />
      </GridColumn>
    </GridRow>
  </Grid>
);
