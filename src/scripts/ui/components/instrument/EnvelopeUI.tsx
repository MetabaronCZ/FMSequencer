import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import {
  ENVELOPE_ATTACK_MAX,
  ENVELOPE_ATTACK_MIN,
  ENVELOPE_DECAY_MAX,
  ENVELOPE_DECAY_MIN,
  ENVELOPE_RELEASE_MAX,
  ENVELOPE_RELEASE_MIN,
  ENVELOPE_SUSTAIN_MAX,
  ENVELOPE_SUSTAIN_MIN,
} from 'modules/engine/config';
import { EnvelopeData } from 'modules/project/instrument/envelope';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { SelectorField } from 'ui/common/SelectorField';
import { getSelection } from 'ui/event';

const attacks = createRange(ENVELOPE_ATTACK_MIN, ENVELOPE_ATTACK_MAX, 10);
const decays = createRange(ENVELOPE_DECAY_MIN, ENVELOPE_DECAY_MAX, 10);
const sustains = createRange(ENVELOPE_SUSTAIN_MIN, ENVELOPE_SUSTAIN_MAX);
const releases = createRange(ENVELOPE_RELEASE_MIN, ENVELOPE_RELEASE_MAX, 10);

const attackValues = getSelection(attacks, (item) => ({
  label: toFixedLength(item.toFixed(1), 4),
  value: item,
}));

const decayValues = getSelection(decays, (item) => ({
  label: toFixedLength(item.toFixed(1), 4),
  value: item,
}));

const sustainValues = getSelection(sustains, (item) => ({
  label: toFixedLength(item, 3),
  value: item,
}));

const releaseValues = getSelection(releases, (item) => ({
  label: toFixedLength(item.toFixed(1), 4),
  value: item,
}));

interface Props {
  readonly track: number;
  readonly operator: number;
  readonly data: EnvelopeData;
  readonly highlighted: boolean;
}

export const EnvelopeUI: React.FC<Props> = ({
  track,
  operator,
  data,
  highlighted,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { attack, decay, sustain, release } = data;
  const {
    setInstrumentOperatorEnvelopeAction,
    setInstrumentOperatorEnvelopeDecay,
    setInstrumentOperatorEnvelopeSustain,
    setInstrumentOperatorEnvelopeRelease,
  } = projectSlice.actions;

  return (
    <Grid>
      <GridRow>
        <GridColumn>
          <SelectorField
            label={t('envelopeAttack')}
            value={attack}
            values={attackValues}
            inverse={highlighted}
            onChange={(value) => {
              dispatch(
                setInstrumentOperatorEnvelopeAction({
                  track,
                  operator,
                  data: value,
                })
              );
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <SelectorField
            label={t('envelopeDecay')}
            value={decay}
            values={decayValues}
            inverse={highlighted}
            onChange={(value) => {
              dispatch(
                setInstrumentOperatorEnvelopeDecay({
                  track,
                  operator,
                  data: value,
                })
              );
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <SelectorField
            label={t('envelopeSustain')}
            value={sustain}
            values={sustainValues}
            inverse={highlighted}
            onChange={(value) => {
              dispatch(
                setInstrumentOperatorEnvelopeSustain({
                  track,
                  operator,
                  data: value,
                })
              );
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <SelectorField
            label={t('envelopeRelease')}
            value={release}
            values={releaseValues}
            inverse={highlighted}
            onChange={(value) => {
              dispatch(
                setInstrumentOperatorEnvelopeRelease({
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
