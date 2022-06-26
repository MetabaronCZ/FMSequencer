import React from 'react';

import { createRange } from 'core/array';

import { PITCH_MAX, PITCH_MIN } from 'modules/engine/config';
import { getNoteName } from 'modules/engine/pitch';

import { Selector } from 'ui/common/Selector';
import { getSelection } from 'ui/event';

const pitches = createRange(PITCH_MIN, PITCH_MAX);

const pitchValues = getSelection(pitches, (val) => ({
  label: getNoteName(val),
  value: val,
}));

interface Props {
  readonly value: number | null;
  readonly placeholder?: string;
  readonly onChange: (value: number) => void;
  readonly onDelete: () => void;
}

export const PitchSelector: React.FC<Props> = ({
  value,
  placeholder,
  onChange,
  onDelete,
}) => (
  <Selector
    value={value}
    values={pitchValues}
    defaultValue={60}
    shiftStep={12}
    placeholder={placeholder}
    plain
    onChange={onChange}
    onDelete={onDelete}
  />
);
