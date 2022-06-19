import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import {
  SEQUENCE_LENGTH_MAX,
  SEQUENCE_LENGTH_MIN,
} from 'modules/project/config';

import { Field } from 'ui/common/Field';
import { Selector } from 'ui/common/Selector';
import { getSelection } from 'ui/event';

let barsFieldCounter = 0;

const barIds = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_LENGTH_MAX);

const barValues = getSelection(barIds, (id) => ({
  label: `${toFixedLength(id, 2, '0')}`,
  value: id,
}));

interface Props {
  readonly bars: number;
  readonly onChange: (bars: number) => void;
}

export const SequenceLengthSelector: React.FC<Props> = ({ bars, onChange }) => {
  const { t } = useTranslation();
  const id = `sequence-length-selector-${barsFieldCounter++}`;

  return (
    <Field id={id} label={t('bars')}>
      <Selector value={bars} values={barValues} onChange={onChange} />
    </Field>
  );
};
