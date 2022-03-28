import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { SelectionValue } from 'ui/event';
import { InputStyles } from 'ui/common/Input';

type OnChange<T extends string | number> = (value: T) => void;
type OnClose = () => void;

const select = <T extends number | string>(value: T, onSelect: OnChange<T>, onClose: OnClose) => (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(value);
    onClose();
};

const closeFn = (container: React.MutableRefObject<HTMLDivElement | null>, cb: OnClose) => (e: MouseEvent) => {
    const tgt = e.target;
    const cont = container.current;

    if (cont && tgt instanceof Element && tgt !== cont && !cont.contains(tgt)) {
        cb();
    }
};

export const SelectBaseStyles = css`
    ${InputStyles};
    position: relative;
    display: inline-block;
    user-select: none;
    text-align: right;
    cursor: pointer;
`;

interface StyledProps {
    readonly $opened: boolean;
}

const Container = styled.output<StyledProps>`
    ${SelectBaseStyles};

    &::after {
        display: inline-block;
        content: "${({ $opened }) => $opened ? '˄' : '˅'}";
        margin-left: ${toVU(0.5)};
    }
`;

const List = styled.ul`
    list-style-type: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    overflow-y: auto;
    min-width: ${toVU(15)};
    max-height: ${toVU(25)};
    padding: 0 ${toVU(0.5)};
    border-top: ${({ theme }) => theme.border.grey};
    background-color: ${({ theme }) => theme.color.greyLightest};
`;

const Item = styled.li`
    border-bottom: ${({ theme }) => theme.border.grey};

    &:last-child {
        border-bottom: none;
    }
`;

const StyledButton = styled.button`
    ${Text.Default};
    display: block;
    width: 100%;
    background: transparent;
    white-space: nowrap;
    border: none;
    cursor: pointer;
    text-align: left;
`;

interface Props<T extends string | number> {
    readonly id?: string;
    readonly value: T | null;
    readonly values: SelectionValue<T>[];
    readonly placeholder?: string;
    readonly onChange: OnChange<T>;
}

export const Select = <T extends string | number>(props: Props<T>): JSX.Element => {
    const { id, value, values, placeholder = '', onChange } = props;
    const [focused, setFocused] = useState(false);
    const listElm = useRef<HTMLDivElement | null>(null);
    const selected = values.find((val) => val.value === value);

    const onClose = (): void => setFocused(false);
    const close = closeFn(listElm, onClose);

    useEffect(() => {
        document.addEventListener('click', close);

        return () => {
            document.removeEventListener('click', close);
        };
    }, [close]);

    return (
        <Container
            id={id}
            ref={listElm}
            tabIndex={0}
            $opened={focused}
            onFocus={() => setFocused(true)}
        >
            {selected ? selected.label : placeholder}

            {focused && (
                <List>
                    {values.map(({ label, value }, i) => (
                        <Item key={i}>
                            <StyledButton
                                type="button"
                                onClick={select(value, onChange, onClose)}
                            >
                                {label}
                            </StyledButton>
                        </Item>
                    ))}
                </List>
            )}
        </Container>
    );
};
