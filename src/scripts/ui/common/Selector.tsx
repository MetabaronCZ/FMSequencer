import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Text } from 'ui/common/Text';

const defaultStepMultiplier = 1;
const shiftStepMultiplier = 10;

type OnChange<T extends string | number> = (value: T) => void;
type OnDelete = () => void;
type SelectorAction = 'UP' | 'DOWN' | 'DELETE';

interface SelectorValue<T extends string | number> {
    readonly label: string;
    readonly value: T;
}
type SelectorCallback<T extends string | number> = (item: T, i: number) => SelectorValue<T>;

export const getSelectorValues = <T extends string | number>(items: T[], cb: SelectorCallback<T>): SelectorValue<T>[] => {
    return items.map(cb);
};

const preventScroll = (e: WheelEvent): void => {
    e.preventDefault();
};

const setPreventScroll = (elm: HTMLElement | null): void => {
    const cont = elm ? elm.closest('main') : null;
    if (cont) {
        cont.addEventListener('wheel', preventScroll);
    }
};

const releasePreventScroll = (elm: HTMLElement | null): void => {
    const cont = elm ? elm.closest('main') : null;
    if (cont) {
        cont.removeEventListener('wheel', preventScroll);
    }
};

const change = <T extends string | number>(value: T | null, values: SelectorValue<T>[], defaultValue: T | null, onChange: OnChange<T>, onDelete: OnDelete, action: SelectorAction, shiftKey: boolean): void => {
    const step = shiftKey ? shiftStepMultiplier : defaultStepMultiplier;
    const index = values.findIndex((val) => val.value === value);
    const firstValue = values[0].value;
    const lastValue = values[values.length - 1].value;
    const startValue = defaultValue ?? firstValue; // first value when no value set

    switch (action) {
        case 'UP':
            if (-1 !== index) {
                const selected = values[index + step];
                onChange(selected ? selected.value : lastValue);
            } else {
                onChange(startValue);
            }
            break;

        case 'DOWN':
            if (-1 !== index) {
                const selected = values[index - step];
                onChange(selected ? selected.value : firstValue);
            } else {
                onChange(startValue);
            }
            break;

        case 'DELETE':
            onDelete();
            break;

        default:
            // do nothing
    }
};

const keyup = <T extends string | number>(value: T | null, values: SelectorValue<T>[], defaultValue: T | null, onChange: OnChange<T>, onDelete: OnDelete) => (e: React.KeyboardEvent) => {
    let action: SelectorAction | null = null;
    e.preventDefault();

    switch (e.code) {
        case 'ArrowDown':
        case 'ArrowLeft':
            action = 'DOWN';
            break;

        case 'ArrowUp':
        case 'ArrowRight':
            action = 'UP';
            break;

        case 'Delete':
            action = 'DELETE';
            break;

        default:
            // do nothing
    }
    if (action) {
        change(value, values, defaultValue,onChange, onDelete, action, e.shiftKey);
    }
};

const wheel = <T extends string | number>(value: T | null, values: SelectorValue<T>[], defaultValue: T | null, onChange: OnChange<T>, onDelete: OnDelete) => (e: React.WheelEvent) => {
    let action: SelectorAction | null = null;

    if (e.deltaY > 0) {
        action = 'DOWN';
    } else if (e.deltaY < 0) {
        action = 'UP';
    }
    if (action) {
        change(value, values, defaultValue, onChange, onDelete, action, e.shiftKey);
    }
};

const Container = styled.div`
    ${Text.Default};
    display: inline-block;
    background: ${({ theme }) => theme.color.white};
    user-select: none;
    outline: none;
    text-align: right;
    cursor: pointer;

    &:hover,
    &:focus {
        background: ${({ theme }) => theme.color.greyLightest};
    }
`;

interface Props<T extends string | number> {
    readonly value: T | null;
    readonly defaultValue?: T;
    readonly values: SelectorValue<T>[];
    readonly placeholder?: string;
    readonly onChange: OnChange<T>;
    readonly onDelete?: OnDelete;
}

export const Selector = <T extends string | number>(props: Props<T>): JSX.Element => {
    const { value, values, defaultValue = null, placeholder = '', onChange, onDelete = () => null } = props;
    const [focused, setFocused] = useState(false);
    const contElm = useRef<HTMLDivElement>(null);
    const selected = values.find((val) => val.value === value);
    return (
        <Container
            ref={contElm}
            tabIndex={0}
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
