import React from 'react';
import styled from 'styled-components';

import { Text } from 'ui/common/Text';

const Container = styled.div`
    display: flex;
`;

const Label = styled.label`
    ${Text.Default};
`;

const Unit = styled.span`
    ${Text.Default};
    margin-left: 1px;
`;

interface Props {
    readonly id: string;
    readonly label: string;
    readonly unit?: string;
}

export const Field: React.FC<Props> = ({ id, label, unit, children }) => (
    <Container>
        <Label htmlFor={id}>
            {label}
        </Label>

        <div>
            &nbsp;{children}
        </div>

        {!!unit && (
            <Unit>{unit}</Unit>
        )}
    </Container>
);
