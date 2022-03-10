import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { change, OnChange } from 'ui/event';

interface SelectOption<T extends string> {
    readonly label: string;
    readonly value: T;
}
export const createSelectOptions = <T, U extends string>(data: T[], cb: (item: T, i: number) => SelectOption<U>): SelectOption<U>[] => {
    return data.map(cb);
};

interface StyledProps {
    readonly $inverted: boolean;
}
const StyledSelect = styled.select<StyledProps>`
    ${Text.Default};
    display: inline-block;
    height: ${toVU(3)};
    padding: 0;
    border: none;
    outline: none;
    background: ${({ theme }) => theme.color.white};
    font-size: inherit;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.color.greyLightest};
    }

    option {
        ${Text.Default};
        font-size: inherit;
        background: ${({ theme }) => theme.color.white};
    }

    ${({ $inverted, theme }) => $inverted && `
        color: ${theme.color.white};
        background-color: ${theme.color.black};

        &:hover {
            background-color: ${theme.color.greyDarkest};
        }
    `}
`;

interface Props<T extends string> {
    readonly value: T;
    readonly options: SelectOption<T>[];
    readonly inverted?: boolean;
    readonly onChange: OnChange<T>;
}

export const SelectRaw = <T extends string>({ value, options, inverted, onChange }: Props<T>): JSX.Element => (
    <StyledSelect
        $inverted={!!inverted}
        value={value}
        onChange={change(onChange)}
    >
        {options.map(({ label, value }) => (
            <option value={value} key={value}>
                {label}
            </option>
        ))}
    </StyledSelect>
);
