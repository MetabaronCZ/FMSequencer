import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React from 'react';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { OperatorActionPayload } from 'store/instrument/operator';
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
  LEVEL_MAX,
  LEVEL_MIN,
  OscillatorTypeID,
  RatioID,
  oscillatorTypes,
  ratios,
} from 'modules/engine/config';
import { OperatorData } from 'modules/project/instrument/operator';

import { Checkbox } from 'ui/common/Checkbox';
import { Selector } from 'ui/common/Selector';
import { OperatorTableRow } from 'ui/components/instrument/OperatorTable';
import { SelectionValue, getSelection } from 'ui/event';

type SelectorColumn<T extends string | number> = [
  T,
  SelectionValue<T>[],
  ActionCreatorWithPayload<OperatorActionPayload<T>, string>
];

type SelectorColumns = [
  SelectorColumn<OscillatorTypeID>,
  SelectorColumn<number>,
  SelectorColumn<RatioID>,
  SelectorColumn<number>,
  SelectorColumn<number>,
  SelectorColumn<number>,
  SelectorColumn<number>
];

const {
  setInstrumentOperatorType,
  setInstrumentOperatorLevel,
  setInstrumentOperatorRatio,
  setInstrumentOperatorEnvelopeAction,
  setInstrumentOperatorEnvelopeDecay,
  setInstrumentOperatorEnvelopeSustain,
  setInstrumentOperatorEnvelopeRelease,
} = projectSlice.actions;

const levels = createRange(LEVEL_MIN, LEVEL_MAX);
const attacks = createRange(ENVELOPE_ATTACK_MIN, ENVELOPE_ATTACK_MAX, 10);
const decays = createRange(ENVELOPE_DECAY_MIN, ENVELOPE_DECAY_MAX, 10);
const sustains = createRange(ENVELOPE_SUSTAIN_MIN, ENVELOPE_SUSTAIN_MAX);
const releases = createRange(ENVELOPE_RELEASE_MIN, ENVELOPE_RELEASE_MAX, 10);

const shapeValues = getSelection([...oscillatorTypes], (item) => ({
  label: item,
  value: item,
}));

const levelValues = getSelection(levels, (val) => ({
  label: toFixedLength(val, 3),
  value: val,
}));

const ratioValues = getSelection([...ratios], (val) => ({
  label: toFixedLength(val, 3),
  value: val,
}));

const attackValues = getSelection(attacks, (item) => ({
  label: toFixedLength(item.toFixed(1), 3),
  value: item,
}));

const decayValues = getSelection(decays, (item) => ({
  label: toFixedLength(item.toFixed(1), 3),
  value: item,
}));

const sustainValues = getSelection(sustains, (item) => ({
  label: toFixedLength(item, 3),
  value: item,
}));

const releaseValues = getSelection(releases, (item) => ({
  label: toFixedLength(item.toFixed(1), 3),
  value: item,
}));

const getOperatorColumnData = (
  operator: OperatorData
): SelectorColumn<string | number>[] => {
  const { type, level, ratio, envelope } = operator;
  const { attack, decay, sustain, release } = envelope;

  const selectorColumns: SelectorColumns = [
    [type, shapeValues, setInstrumentOperatorType],
    [level, levelValues, setInstrumentOperatorLevel],
    [ratio, ratioValues, setInstrumentOperatorRatio],
    [attack, attackValues, setInstrumentOperatorEnvelopeAction],
    [decay, decayValues, setInstrumentOperatorEnvelopeDecay],
    [sustain, sustainValues, setInstrumentOperatorEnvelopeSustain],
    [release, releaseValues, setInstrumentOperatorEnvelopeRelease],
  ];
  return selectorColumns as SelectorColumn<string | number>[];
};

interface Props {
  readonly track: number;
  readonly operatorId: number;
  readonly isInverse: boolean;
  readonly operator: OperatorData;
}

export const OperatorUI: React.FC<Props> = ({
  track,
  operatorId,
  isInverse,
  operator,
}) => {
  const dispatch = useAppDispatch();
  const { setInstrumentOperatorActive } = projectSlice.actions;
  const columns = getOperatorColumnData(operator);
  const checkboxId = `checkbox-operator-${operatorId}`;

  return (
    <OperatorTableRow $inverse={isInverse}>
      <th>
        <label htmlFor={checkboxId}>OP{operatorId + 1}</label>
      </th>

      <td>
        <Checkbox
          id={checkboxId}
          checked={operator.active}
          onChange={(checked) => {
            dispatch(
              setInstrumentOperatorActive({
                track,
                operator: operatorId,
                data: checked,
              })
            );
          }}
        />
      </td>

      {columns.map(([value, values, action], s) => (
        <td key={s}>
          <Selector
            value={value}
            values={values}
            inverse={isInverse}
            onChange={(value) => {
              dispatch(
                action({
                  track,
                  operator: operatorId,
                  data: value,
                })
              );
            }}
          />
        </td>
      ))}
    </OperatorTableRow>
  );
};
