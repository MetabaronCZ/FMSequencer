import React from 'react';
import styled from 'styled-components';

import { Field } from 'ui/common/Field';
import { change, OnChange } from 'ui/event';
import { InputStyles } from 'ui/common/Input';

let inputCounter = 0;

const StyledInput = styled.input`
    ${InputStyles};
`;

interface Props {
    readonly label: string;
    readonly value: string;
    readonly placeholder?: string;
    readonly onChange: OnChange<string>;
}

export const TextInput: React.FC<Props> = ({ label, value, placeholder, onChange }) => {
    const id = `text-input-${inputCounter++}`;
    return (
        <Field id={id} label={label}>
            <StyledInput
                id={id}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={change(onChange)}
            />
        </Field>
    );
};
