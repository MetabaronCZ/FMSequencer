import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import {
  PatternDivisionID,
  patternDivisions,
  SEQUENCE_LENGTH_MAX,
  SEQUENCE_LENGTH_MIN,
} from 'modules/project/config';

import { getSelection } from 'ui/event';
import { Field } from 'ui/common/Field';
import { Selector } from 'ui/common/Selector';

let selectorFieldCounter = 0;

const beatValues = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_LENGTH_MAX);

const beatSelectionOptions = getSelection(beatValues, (id) => ({
  label: `${toFixedLength(id, 2, '0')}`,
  value: id,
}));

const divisionSelectionOptions = getSelection([...patternDivisions], (id) => ({
  label: `${toFixedLength(id, 2, '0')}`,
  value: id,
}));

interface Props {
  readonly beats: number;
  readonly division: PatternDivisionID;
  readonly onChange: (beats: number, division: PatternDivisionID) => void;
}

export const SignatureSelector: React.FC<Props> = ({
  beats,
  division,
  onChange,
}) => {
  const { t } = useTranslation();
  const id = `sig-selector-${selectorFieldCounter++}`;

  return (
    <Field id={id} label={t('signature')}>
      <Selector
        value={beats}
        values={beatSelectionOptions}
        onChange={(value) => onChange(value, division)}
      />

      {'/'}

      <Selector
        value={division}
        values={divisionSelectionOptions}
        onChange={(value) => onChange(beats, value)}
      />
    </Field>
  );
};
