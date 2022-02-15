import React from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/typography';

import { Text } from 'ui/common/Text';
import { Field } from 'ui/common/Field';

let selectCounter = 0;

type Onchange<T extends string> = (value: T) => void;

const change = <T extends string>(cb: Onchange<T>) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as T;
    e.preventDefault();
    cb(value);
};

interface SelectOption<T extends string> {
    readonly label: string;
    readonly value: T;
}
export const createSelectOptions = <T extends string, U extends string>(data: T[], cb: (item: T) => SelectOption<U>): SelectOption<U>[] => {
    return data.map(cb);
};

const StyledSelect = styled.select`
    display: block;
    width: 100%;
    height: ${toVU(3)};
    padding: 0 ${toVU(1)};
    border: none;
    outline: none;
    background: ${({ theme }) => theme.color.white};
    cursor: pointer;

    option {
        ${Text.Default};
    }
`;

interface Props<T extends string> {
    readonly label: string;
    readonly value: T;
    readonly options: SelectOption<T>[];
    readonly onChange: Onchange<T>;
}

export const Select = <T extends string>({ label, value, options, onChange }: Props<T>): JSX.Element => {
    const id = `select-${selectCounter++}`;
    return (
        <Field id={id} label={label}>
            <StyledSelect
                id={id}
                title={`${value}`}
                value={value}
                onChange={change(onChange)}
            >
                {options.map(({ label, value }) => (
                    <option value={value} key={value}>
                        {label}
                    </option>
                ))}
            </StyledSelect>
        </Field>
    );
};
