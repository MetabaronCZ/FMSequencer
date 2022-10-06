import React from 'react';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { VELOCITY_MAX, VELOCITY_MIN } from 'modules/engine/config';

import { Selector } from 'ui/common/Selector';
import { getSelection } from 'ui/event';

const velocities = createRange(VELOCITY_MIN, VELOCITY_MAX);

const velocityValues = getSelection(velocities, (val) => ({
  label: toFixedLength(val, 2),
  value: val,
}));

interface Props {
  readonly value: number | null;
  readonly placeholder?: string;
  readonly onChange: (value: number) => void;
}

export const VelocitySelector: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
}) => (
  <Selector
    value={value}
    values={velocityValues}
    placeholder={placeholder}
    plain
    onChange={onChange}
  />
);
