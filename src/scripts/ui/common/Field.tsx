import React from 'react';
import styled from 'styled-components';

import { Text } from 'ui/common/Text';

interface StyledProps {
    readonly $inverse: boolean;
}

const Container = styled.div<StyledProps>`
    ${Text.Default};
    display: flex;
    color: ${({ theme, $inverse }) => $inverse ? theme.color.white : ''};
`;

const Unit = styled.span`
    margin-left: 1px;
`;

interface Props {
    readonly id: string;
    readonly label: string;
    readonly unit?: string;
    readonly inverse?: boolean;
}

export const Field: React.FC<Props> = ({ id, label, unit, inverse, children }) => (
    <Container $inverse={!!inverse}>
        <label htmlFor={id}>
            {label}
        </label>

        <div>
            &nbsp;{children}
        </div>

        {!!unit && <Unit>{unit}</Unit>}
    </Container>
);
