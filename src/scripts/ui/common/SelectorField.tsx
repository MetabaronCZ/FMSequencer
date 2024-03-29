import React from 'react';

import { Field } from 'ui/common/Field';
import { Selector, SelectorProps } from 'ui/common/Selector';

let selectorFieldCounter = 0;

interface Props<T extends string | number> extends SelectorProps<T> {
  readonly label?: string;
  readonly inverse?: boolean;
  readonly inverseLabel?: boolean;
  readonly borderless?: boolean;
}

export const SelectorField = <T extends string | number>(
  props: Props<T>
): JSX.Element => {
  const { label, inverseLabel, ...otherProps } = props;
  const id = `selector-${selectorFieldCounter++}`;
  return (
    <Field id={id} label={label} inverse={inverseLabel}>
      <Selector id={id} {...otherProps} />
    </Field>
  );
};
