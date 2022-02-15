import React from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/typography';
import { Text } from 'ui/common/Text';

const Container = styled.div`
    display: inline-block;
    min-width: ${toVU(25)};
    margin-right: ${toVU(1)};
    border: ${({ theme }) => theme.border.default};
    border-radius: ${({ theme }) => theme.radius.default};
    vertical-align: top;

    &:last-child {
        margin-right: 0;
    }
`;

const Label = styled.label`
    ${Text.Default};
    display: block;
    font-weight: bold;
    padding: 0 ${toVU(1)};
    color: ${({ theme }) => theme.color.white};
    background: ${({ theme }) => theme.color.black};
`;

interface Props {
    readonly id: string;
    readonly label: string;
}

export const Field: React.FC<Props> = ({ id, label, children }) => (
    <Container>
        <Label htmlFor={id}>{label}</Label>
        {children}
    </Container>
);
