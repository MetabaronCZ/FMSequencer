import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import {
  FREQUENCY_MAX,
  FREQUENCY_MIN,
  RESONANCE_MAX,
  RESONANCE_MIN,
  filterTypes,
} from 'modules/engine/config';
import { FilterData } from 'modules/project/instrument/filter';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { SelectorField } from 'ui/common/SelectorField';
import { getSelection } from 'ui/event';

const freqs = createRange(FREQUENCY_MIN, FREQUENCY_MAX);
const resos = createRange(RESONANCE_MIN, RESONANCE_MAX, 10);

const filterTypeValues = getSelection([...filterTypes], (item) => ({
  label: item,
  value: item,
}));

const frequencyValues = getSelection(freqs, (item) => ({
  label: toFixedLength(item, 5),
  value: item,
}));

const resonanceValues = getSelection(resos, (item) => ({
  label: item.toFixed(1),
  value: item,
}));

interface Props {
  readonly track: number;
  readonly data: FilterData;
}

export const FilterUI: React.FC<Props> = ({ track, data }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { type, cutoff, resonance } = data;
  const {
    setInstrumentFilterType,
    setInstrumentFilterCutoff,
    setInstrumentFilterResonance,
  } = projectSlice.actions;

  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <SelectorField
            label={t('filter')}
            value={type}
            values={filterTypeValues}
            onChange={(value) =>
              dispatch(setInstrumentFilterType({ track, data: value }))
            }
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <SelectorField
            label={t('filterCutoff')}
            value={cutoff}
            values={frequencyValues}
            step={100}
            onChange={(value) =>
              dispatch(setInstrumentFilterCutoff({ track, data: value }))
            }
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <SelectorField
            label={t('filterResonance')}
            value={resonance}
            values={resonanceValues}
            onChange={(value) =>
              dispatch(setInstrumentFilterResonance({ track, data: value }))
            }
          />
        </GridColumn>
      </GridRow>
    </Grid>
  );
};
