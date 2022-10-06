import React from 'react';
import { useTranslation } from 'react-i18next';

import { createArray } from 'core/array';
import { toFixedLength } from 'core/format';

import { SEQUENCE_COUNT } from 'modules/project/config';

import { SelectorField } from 'ui/common/SelectorField';
import { getSelection } from 'ui/event';

const sequenceIds = createArray(SEQUENCE_COUNT);

const values = getSelection(sequenceIds, (id) => ({
  label: `${toFixedLength(id + 1, 2, '0')}`,
  value: id,
}));

interface Props {
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export const SequenceSelector: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <SelectorField
      label={t('sequence')}
      value={value}
      values={values}
      onChange={onChange}
    />
  );
};
