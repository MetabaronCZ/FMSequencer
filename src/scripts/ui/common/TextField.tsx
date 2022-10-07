import React from 'react';
import styled from 'styled-components';

import { Field } from 'ui/common/Field';
import { InputStyles } from 'ui/common/Input';
import { OnChange, change } from 'ui/event';

let textFieldCounter = 0;

const StyledInput = styled.input`
  ${InputStyles};
  width: 100%;
`;

interface Props {
  readonly label?: string;
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
