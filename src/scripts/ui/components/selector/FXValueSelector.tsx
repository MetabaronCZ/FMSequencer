import React from 'react';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { STEP_FX_VALUE_MAX, STEP_FX_VALUE_MIN } from 'modules/project/config';

import { Selector } from 'ui/common/Selector';
import { getSelection } from 'ui/event';

const fxs = createRange(STEP_FX_VALUE_MIN, STEP_FX_VALUE_MAX);

const fxValues = getSelection(fxs, (id) => ({
  label: `${toFixedLength(id, 3)}`,
  value: id,
}));

interface Props {
  readonly value: number | null;
  readonly placeholder?: string;
  readonly onChange: (value: number) => void;
}

export const FXValueSelector: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
}) => (
  <Selector
    value={value}
    values={fxValues}
    placeholder={placeholder}
    plain
    onChange={onChange}
  />
);
