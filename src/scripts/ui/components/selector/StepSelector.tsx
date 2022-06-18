import React from 'react';
import { useTranslation } from 'react-i18next';

import { toFixedLength } from 'core/format';

import { PatternDivisionID, patternDivisions } from 'modules/project/config';

import { SelectorField } from 'ui/common/SelectorField';
import { getSelection } from 'ui/event';

const values = getSelection([...patternDivisions], (id) => ({
  label: `${toFixedLength(id, 2, '0')}`,
  value: id,
}));

interface Props {
  readonly value: PatternDivisionID;
  readonly onChange: (value: PatternDivisionID) => void;
}

export const StepSelector: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <SelectorField
      label={t('steps')}
      value={value}
      values={values}
      onChange={onChange}
    />
  );
};
