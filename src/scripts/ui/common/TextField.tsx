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

const StyledTextarea = styled.textarea`
    ${InputStyles};
    height: ${toVU(4 * 3)};
    max-width: ${toVU(20)};
`;

interface Props {
    readonly label: string;
    readonly value: string;
    readonly textarea?: boolean; // field is <tetarea> instead of <input>
    readonly placeholder?: string;
    readonly onChange: OnChange<string>;
}

export const TextField: React.FC<Props> = ({ label, value, textarea, placeholder, onChange }) => {
    const id = `text-field-${textFieldCounter++}`;

    const props = {
        id,
        value,
        placeholder,
        onChange: change(onChange),
    };
    return (
        <Field id={id} label={label}>
            {!textarea
                ? <StyledInput type="text" {...props} />
                : <StyledTextarea {...props} />
            }
        </Field>
    );
};
