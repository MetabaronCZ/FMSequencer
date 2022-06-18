import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { Button } from 'ui/common/Button';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { Toolbar } from 'ui/common/Toolbar';
import { Keyboard } from 'ui/components/Keyboard';
import { AlgorithmCanvas } from 'ui/components/instrument/AlgorithmCanvas';
import { FilterUI } from 'ui/components/instrument/FilterUI';
import { InstrumentBase } from 'ui/components/instrument/InstrumentBase';
import { OperatorList } from 'ui/components/instrument/OperatorList';
import { confirm } from 'ui/dialog';

export const InstrumentUI: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { track } = useAppSelector((state) => state.session);
  const { tracks } = useAppSelector((state) => state.project);
  const { resetInstrument } = projectSlice.actions;

  const { name, algorithm, level, pan, filter, operators } =
    tracks[track].instrument;

  const reset = confirm(t('confirmInstrumentReset'), () =>
    dispatch(
      resetInstrument({
        track,
        data: null,
      })
    )
  );

  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <Toolbar>
            {name}

            {' | '}

            <Button text={t('reset')} onClick={reset} />
          </Toolbar>
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
