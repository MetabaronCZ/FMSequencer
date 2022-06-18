import React from 'react';

import { useAppSelector } from 'store';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { Keyboard } from 'ui/components/Keyboard';
import { AlgorithmCanvas } from 'ui/components/instrument/AlgorithmCanvas';
import { FilterUI } from 'ui/components/instrument/FilterUI';
import { InstrumentBase } from 'ui/components/instrument/InstrumentBase';
import { InstrumentToolbar } from 'ui/components/instrument/InstrumentToolbar';
import { OperatorList } from 'ui/components/instrument/OperatorList';

export const InstrumentUI: React.FC = () => {
  const { track } = useAppSelector((state) => state.session);
  const { tracks } = useAppSelector((state) => state.project);

  const { name, algorithm, level, pan, filter, operators } =
    tracks[track].instrument;

  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <InstrumentToolbar name={name} />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <AlgorithmCanvas algorithm={algorithm} />
        </GridColumn>

        <GridColumn $size={2}>
          <InstrumentBase
            track={track}
            algorithm={algorithm}
            level={level}
            pan={pan}
          />
        </GridColumn>

        <GridColumn $size={3}>
          <FilterUI track={track} data={filter} />
        </GridColumn>
      </GridRow>

      <GridRow />

      <GridRow $size={1}>
        <GridColumn>
          <OperatorList track={track} data={operators} />
          <Keyboard track={track} />
        </GridColumn>
      </GridRow>
    </Grid>
  );
};
