import React from 'react';

import { toFixedLength } from 'core/format';

import { StepFXType, stepFXTypes } from 'modules/project/config';

import { Selector } from 'ui/common/Selector';
import { getSelection } from 'ui/event';

const fxTypeValues = getSelection([...stepFXTypes], (id) => ({
  label: `${toFixedLength(id, 3)}`,
  value: id,
}));

interface Props {
  readonly value: StepFXType | null;
  readonly placeholder?: string;
  readonly onChange: (value: StepFXType) => void;
  readonly onDelete: () => void;
}

export const FXTypeSelector: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
  onDelete,
}) => (
  <Selector
    value={value}
    values={fxTypeValues}
    defaultValue="???"
    placeholder={placeholder}
    plain
    onChange={onChange}
    onDelete={onDelete}
  />
);
