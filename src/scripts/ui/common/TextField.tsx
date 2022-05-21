import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Field } from 'ui/common/Field';
import { change, OnChange } from 'ui/event';
import { InputStyles } from 'ui/common/Input';

let textFieldCounter = 0;

const StyledInput = styled.input`
    ${InputStyles};
    max-width: ${toVU(20)};
`;

interface Props {
    readonly label: string;
    readonly value: string;
    readonly placeholder?: string;
    readonly inverse?: boolean;
    readonly onChange: OnChange<string>;
}

export const TextField: React.FC<Props> = ({ label, value, placeholder, inverse, onChange }) => {
    const id = `text-field-${textFieldCounter++}`;

    const props = {
        id,
        value,
        placeholder,
        onChange: change(onChange),
    };
    return (
        <Field
            id={id}
            label={label}
            inverse={inverse}
        >
            <StyledInput type="text" {...props} />
        </Field>
    );
};
