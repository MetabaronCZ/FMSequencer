import React from 'react';
import { useTranslation } from 'react-i18next';

import { createArray } from 'core/array';
import { toFixedLength } from 'core/format';

import { PATTERN_COUNT } from 'modules/project/config';

import { getSelection } from 'ui/event';
import { SelectorField } from 'ui/common/SelectorField';

const patternIds = createArray(PATTERN_COUNT);

const values = getSelection(patternIds, (id) => ({
  label: `${toFixedLength(id + 1, 3, '0')}`,
  value: id,
}));

interface Props {
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export const PatternSelector: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <SelectorField
      label={t('pattern')}
      value={value}
      values={values}
      onChange={onChange}
    />
  );
};
