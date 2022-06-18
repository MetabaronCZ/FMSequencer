import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Field } from 'ui/common/Field';
import { change, OnChange } from 'ui/event';
import { InputStyles } from 'ui/common/Input';

let textFieldCounter = 0;

const StyledInput = styled.input`
  ${InputStyles};
  max-width: ${toVU(20)};
`;

interface Props {
  readonly label: string;
  readonly value: string;
  readonly placeholder?: string;
  readonly inverse?: boolean;
  readonly inverseLabel?: boolean;
  readonly borderless?: boolean;
  readonly onChange: OnChange<string>;
}

export const TextField: React.FC<Props> = (props) => {
  const id = `text-field-${textFieldCounter++}`;

  const { label, inverseLabel, inverse, borderless, onChange, ...otherProps } =
    props;

  return (
    <Field id={id} label={label} inverse={inverseLabel}>
      <StyledInput
        id={id}
        type="text"
        $inverse={inverse}
        $borderless={borderless}
        onChange={change(onChange)}
        {...otherProps}
      />
    </Field>
  );
};
