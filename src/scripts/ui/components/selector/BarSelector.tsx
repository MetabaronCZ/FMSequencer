import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import {
  SEQUENCE_LENGTH_MAX,
  SEQUENCE_LENGTH_MIN,
} from 'modules/project/config';

import { SelectorField } from 'ui/common/SelectorField';
import { getSelection } from 'ui/event';

const barIds = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_LENGTH_MAX);

const values = getSelection(barIds, (id) => ({
  label: `${toFixedLength(id, 2, '0')}`,
  value: id,
}));

interface Props {
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export const BarSelector: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <SelectorField
      label={t('bars')}
      value={value}
      values={values}
      onChange={onChange}
    />
  );
};
