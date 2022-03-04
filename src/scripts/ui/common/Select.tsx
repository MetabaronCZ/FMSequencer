import React from 'react';
import styled from 'styled-components';

import { Field } from 'ui/common/Field';
import { change, OnChange } from 'ui/event';
import { InputStyles } from 'ui/common/Input';

let selectCounter = 0;

interface SelectOption<T extends string> {
    readonly label: string;
    readonly value: T;
}
export const createSelectOptions = <T extends string, U extends string>(data: T[], cb: (item: T) => SelectOption<U>): SelectOption<U>[] => {
    return data.map(cb);
};

const StyledSelect = styled.select`
    ${InputStyles};
    cursor: pointer;

    option {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }
`;

interface Props<T extends string> {
    readonly label: string;
    readonly value: T;
    readonly options: SelectOption<T>[];
    readonly onChange: OnChange<T>;
}

export const Select = <T extends string>({ label, value, options, onChange }: Props<T>): JSX.Element => {
    const id = `select-${selectCounter++}`;
    return (
        <Field id={id} label={label}>
            <StyledSelect
                id={id}
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
