import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { InputStyles, InputStylesProps } from 'ui/common/Input';
import { selectorEvents } from 'ui/common/Selector/events';
import { SelectionValue } from 'ui/event';

const { setPreventScroll, releasePreventScroll, keyup, wheel } = selectorEvents;

export type SelectorOnChange<T extends string | number> = (value: T) => void;
export type SelectorOnDelete = () => void;

interface StyledProps extends InputStylesProps {
  readonly $plain: boolean;
}

const Container = styled.output<StyledProps>`
  ${InputStyles};
  position: relative;
  display: inline-block;
  user-select: none;
  text-align: right;
  cursor: pointer;

  ${({ theme, $plain }) =>
    $plain &&
    css`
      border: none;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: ${theme.color.grey1};
      }
    `}
`;

export interface SelectorProps<T extends string | number> {
  readonly id?: string;
  readonly value: T | null;
  readonly defaultValue?: T;
  readonly values: SelectionValue<T>[];
  readonly step?: number;
  readonly shiftStep?: number;
  readonly placeholder?: string;
  readonly inverse?: boolean;
  readonly borderless?: boolean;
  readonly plain?: boolean; // simpler UI theme
  readonly onChange: SelectorOnChange<T>;
  readonly onDelete?: SelectorOnDelete;
}

export const Selector = <T extends string | number>(
  props: SelectorProps<T>
): JSX.Element => {
  const {
    id,
    value,
    values,
    defaultValue = null,
    placeholder = '',
    step = 1,
    shiftStep = 10,
    plain = false,
    borderless = false,
    inverse = false,
    onChange,
    onDelete = () => null,
  } = props;

  const [focused, setFocused] = useState(false);
  const contElm = useRef<HTMLOutputElement>(null);
  const selected = values.find((val) => val.value === value);
  return (
    <Container
      id={id}
      ref={contElm}
      tabIndex={0}
      $plain={plain}
      $inverse={inverse}
      $borderless={borderless}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyUp={keyup(
        value,
        values,
        defaultValue,
        step,
        shiftStep,
        onChange,
        onDelete
      )}
      onWheel={(e) =>
        focused &&
        wheel(
          value,
          values,
          defaultValue,
          step,
          shiftStep,
          onChange,
          onDelete
        )(e)
      }
      onMouseEnter={() => focused && setPreventScroll(contElm.current)}
      onMouseLeave={() => releasePreventScroll(contElm.current)}
    >
      {selected ? selected.label : placeholder}
    </Container>
  );
};
