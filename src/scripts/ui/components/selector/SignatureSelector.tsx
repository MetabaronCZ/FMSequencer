import React from 'react';
import { useTranslation } from 'react-i18next';

import { SignatureID, signatures } from 'modules/project/config';

import { SelectorField } from 'ui/common/SelectorField';
import { getSelection } from 'ui/event';

const values = getSelection([...signatures], (id) => ({
  label: id,
  value: id,
}));

interface Props {
  readonly value: SignatureID;
  readonly onChange: (value: SignatureID) => void;
}

export const SignatureSelector: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <SelectorField
      label={t('signature')}
      value={value}
      values={values}
      onChange={onChange}
    />
  );
};
