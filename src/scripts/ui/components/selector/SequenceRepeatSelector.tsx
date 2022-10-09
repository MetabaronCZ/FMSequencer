import React from 'react';

import { createRange } from 'core/array';

import {
  SEQUENCE_LENGTH_MIN,
  SEQUENCE_REPEAT_MAX,
} from 'modules/project/config';

import { Selector } from 'ui/common/Selector';
import { getSelection } from 'ui/event';

const repeats = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_REPEAT_MAX);

const repeatValues = getSelection(repeats, (val) => ({
  label: `${val}`,
  value: val,
}));

interface Props {
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export const SequenceRepeatSelector: React.FC<Props> = ({
  value,
  onChange,
}) => {
  return (
    <>
      {'×'}
      <Selector value={value} values={repeatValues} onChange={onChange} />
    </>
  );
};
