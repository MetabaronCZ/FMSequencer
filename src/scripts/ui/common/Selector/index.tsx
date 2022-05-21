import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { SelectionValue } from 'ui/event';
import { InputStyles } from 'ui/common/Input';
import { selectorEvents } from 'ui/common/Selector/events';

const { setPreventScroll, releasePreventScroll, keyup, wheel } = selectorEvents;

export type SelectorOnChange<T extends string | number> = (value: T) => void;
export type SelectorOnDelete = () => void;

interface StyledProps {
    readonly $plain: boolean;
}

const Container = styled.output<StyledProps>`
    ${InputStyles};
    position: relative;
    display: inline-block;
    user-select: none;
    text-align: right;
    cursor: pointer;

    ${({ theme, $plain }) => $plain && `
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
    readonly placeholder?: string;
    readonly plain?: boolean; // simpler UI theme
    readonly onChange: SelectorOnChange<T>;
    readonly onDelete?: SelectorOnDelete;
}

export const Selector = <T extends string | number>(props: SelectorProps<T>): JSX.Element => {
    const {
        id, value, values, defaultValue = null, placeholder = '', plain,
        onChange, onDelete = () => null,
    } = props;

    const [focused, setFocused] = useState(false);
    const contElm = useRef<HTMLDivElement>(null);
    const selected = values.find((val) => val.value === value);
    return (
        <Container
            id={id}
            ref={contElm}
            tabIndex={0}
            $plain={!!plain}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyUp={keyup(value, values, defaultValue, onChange, onDelete)}
            onWheel={(e) => focused && wheel(value, values, defaultValue, onChange, onDelete)(e)}
            onMouseEnter={() => setPreventScroll(contElm.current)}
            onMouseLeave={() => releasePreventScroll(contElm.current)}
        >
            {selected ? selected.label : placeholder}
        </Container>
    );
};
