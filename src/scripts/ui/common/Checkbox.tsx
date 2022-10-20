import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { IcoButton } from 'ui/common/IcoButton';
import { Text } from 'ui/common/Text';
import { toVU } from 'ui/typography';

let checkboxCounter = 0;

const Container = styled.label`
  display: flex;
  flex-direction: row;
  gap: ${toVU(0.5)};
`;

const Label = styled.div`
  ${Text.Heading};
  flex: 1;
`;

interface Props {
  readonly id?: string;
  readonly label?: string;
  readonly checked?: boolean;
  readonly onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<Props> = ({ id, label, checked, onChange }) => {
  const { t } = useTranslation();
  id = id ?? `checkbox-${checkboxCounter++}`;
  return (
    <Container htmlFor={id}>
      <IcoButton
        id={id}
        ico={checked ? 'check' : 'cross'}
        title={checked ? t('on') : t('off')}
        onClick={() => onChange(!checked)}
      />
      {!!label && <Label>{label}</Label>}
    </Container>
  );
};
