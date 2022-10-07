import React from 'react';

import { createArray } from 'core/array';
import { toFixedLength } from 'core/format';

import { PATTERN_COUNT } from 'modules/project/config';

import { SelectorField } from 'ui/common/SelectorField';
import { getSelection } from 'ui/event';

const patternIds = createArray(PATTERN_COUNT);

const values = getSelection(patternIds, (id) => ({
  label: `PTN ${toFixedLength(id + 1, 2, '0')}`,
  value: id,
}));

interface Props {
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export const PatternSelector: React.FC<Props> = ({ value, onChange }) => (
  <SelectorField value={value} values={values} onChange={onChange} />
);
