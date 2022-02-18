import React from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/typography';
import { Text } from 'ui/common/Text';

interface StyledProps {
    readonly $isVertical: boolean;
}

const Container = styled.div<StyledProps>`
    display: inline-flex;
    flex-direction: column;
    min-width: ${toVU(20)};
    margin-right: ${toVU(1)};
    border: ${({ theme }) => theme.border.default};
    border-radius: ${({ theme }) => theme.radius.default};
    vertical-align: top;

    &:last-child {
        margin-right: 0;
    }

    ${({ $isVertical }) => $isVertical && `
        min-width: 0;
        flex-direction: row;
    `}
`;

const Label = styled.label<StyledProps>`
    ${Text.Default};
    display: block;
    font-weight: bold;
    padding: 0 ${toVU(1)};
    color: ${({ theme }) => theme.color.white};
    background: ${({ theme }) => theme.color.black};

    ${({ $isVertical }) => $isVertical && `
        writing-mode: vertical-rl;
        padding: ${toVU(1)} 0;
        transform: rotate(180deg);
    `}
`;

interface Props {
    readonly id: string;
    readonly label: string;
    readonly vertical?: boolean;
}

export const Field: React.FC<Props> = ({ id, label, children, vertical = false }) => (
    <Container $isVertical={vertical}>
        <Label
            htmlFor={id}
            $isVertical={vertical}
        >
            {label}
        </Label>
        {children}
    </Container>
);
