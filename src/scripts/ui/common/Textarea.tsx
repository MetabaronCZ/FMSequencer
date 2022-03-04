import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Field } from 'ui/common/Field';
import { change, OnChange } from 'ui/event';
import { InputStyles } from 'ui/common/Input';

let textareaCounter = 0;

const StyledTextarea = styled.textarea`
    ${InputStyles};
    height: ${toVU(4 * 3)};
`;

interface Props {
    readonly label: string;
    readonly value: string;
    readonly placeholder?: string;
    readonly onChange: OnChange<string>;
}

export const Textarea: React.FC<Props> = ({ label, value, placeholder, onChange }) => {
    const id = `textarea-${textareaCounter++}`;
    return (
        <Field id={id} label={label}>
            <StyledTextarea
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={change(onChange)}
            />
        </Field>
    );
};
