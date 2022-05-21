import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

interface StyledProps {
    readonly $inverse: boolean;
}

const Container = styled.div`
    display: flex;
`;

const Label = styled.label<StyledProps>`
    ${Text.Default};
    color: ${({ theme, $inverse }) => $inverse ? theme.color.white : ''};
    margin-right: ${toVU(1)};
`;

interface Props {
    readonly id: string;
    readonly label: string;
    readonly inverse?: boolean;
}

export const Field: React.FC<Props> = ({ id, label, inverse, children }) => (
    <Container>
        <Label htmlFor={id} $inverse={!!inverse}>
            {label}
        </Label>

        {children}
    </Container>
);
