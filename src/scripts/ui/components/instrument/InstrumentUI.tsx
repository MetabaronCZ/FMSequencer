import React from 'react';

import { useAppSelector } from 'store';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { Keyboard } from 'ui/components/Keyboard';
import { AlgorithmCanvas } from 'ui/components/instrument/AlgorithmCanvas';
import { EnvelopeCanvas } from 'ui/components/instrument/EnvelopeCanvas';
import { FilterUI } from 'ui/components/instrument/FilterUI';
import { InstrumentBase } from 'ui/components/instrument/InstrumentBase';
import { InstrumentToolbar } from 'ui/components/instrument/InstrumentToolbar';
import { OperatorList } from 'ui/components/instrument/OperatorList';

export const InstrumentUI: React.FC = () => {
  const { track } = useAppSelector((state) => state.session);
  const { tracks } = useAppSelector((state) => state.project);

  const { instrument } = tracks[track];
  const { algorithm, level, pan, filter, operators } = instrument;

  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <InstrumentToolbar instrument={instrument} />
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

      <GridRow>
        <GridColumn>
          <OperatorList track={track} data={operators} />
          <Keyboard track={track} />
        </GridColumn>
      </GridRow>

      <GridRow $size={1}>
        {operators.map((operator, i) => (
          <GridColumn key={i}>
            <EnvelopeCanvas operator={i + 1} envelope={operator.envelope} />
          </GridColumn>
        ))}
      </GridRow>
    </Grid>
  );
};
