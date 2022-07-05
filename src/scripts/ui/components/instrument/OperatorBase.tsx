import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import {
  LEVEL_MAX,
  LEVEL_MIN,
  OscillatorTypeID,
  RatioID,
  oscillatorTypes,
  ratios,
} from 'modules/engine/config';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { SelectorField } from 'ui/common/SelectorField';
import { Text } from 'ui/common/Text';
import { getSelection } from 'ui/event';

const levels = createRange(LEVEL_MIN, LEVEL_MAX);

const shapeValues = getSelection([...oscillatorTypes], (item) => ({
  label: item,
  value: item,
}));

const levelValues = getSelection(levels, (val) => ({
  label: toFixedLength(val, 3),
  value: val,
}));

const ratioValues = getSelection([...ratios], (val) => ({
  label: toFixedLength(val, 4),
  value: val,
}));

const OperatorName = styled.div`
  ${Text.Heading};
`;

interface Props {
  readonly track: number;
  readonly operator: number;
  readonly type: OscillatorTypeID;
  readonly level: number;
  readonly ratio: RatioID;
  readonly highlighted: boolean;
}

export const OperatorBase: React.FC<Props> = (props) => {
  const { track, operator, type, level, ratio, highlighted } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    setInstrumentOperatorType,
    setInstrumentOperatorLevel,
    setInstrumentOperatorRatio,
  } = projectSlice.actions;

  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <OperatorName>{`${t('operator')} ${operator + 1}`}</OperatorName>
        </GridColumn>

        <GridColumn>
          <SelectorField
            label={t('shape')}
            value={type}
            values={shapeValues}
            inverse={highlighted}
            onChange={(value) => {
              dispatch(
                setInstrumentOperatorType({
                  track,
                  operator,
                  data: value,
                })
              );
            }}
          />
        </GridColumn>

        <GridColumn>
          <SelectorField
            label={t('level')}
            value={level}
            values={levelValues}
            inverse={highlighted}
            onChange={(value) => {
              dispatch(
                setInstrumentOperatorLevel({
                  track,
                  operator,
                  data: value,
                })
              );
            }}
          />
        </GridColumn>

        <GridColumn>
          <SelectorField
            label={t('ratio')}
            value={ratio}
            values={ratioValues}
            inverse={highlighted}
            onChange={(value) => {
              dispatch(
                setInstrumentOperatorRatio({
                  track,
                  operator,
                  data: value,
                })
              );
            }}
          />
        </GridColumn>
      </GridRow>
    </Grid>
  );
};
