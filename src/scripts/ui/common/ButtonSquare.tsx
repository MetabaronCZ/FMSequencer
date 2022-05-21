import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { clickOnly, OnClick } from 'ui/event';

interface StyledProps {
    readonly $isActive: boolean;
}

const StyledButton = styled.button<StyledProps>`
    display: inline-block;
    height: ${toVU(2)};
    width: ${toVU(2)};
    background: transparent;
    border: ${({ theme }) => theme.border.default};
    vertical-align: middle;
    cursor: pointer;

    ${({ $isActive, theme }) => $isActive && `
        color: ${theme.color.white};
        background: ${theme.color.black};
    `}
`;

interface Props {
    readonly text: string;
    readonly title: string;
    readonly isActive: boolean;
    readonly onClick: OnClick;
}

export const ButtonSquare: React.FC<Props> = ({ text, title, isActive, onClick }) => (
    <StyledButton
        $isActive={isActive}
        type="button"
        title={title}
        onClick={clickOnly(onClick)}
    >
        {text}
    </StyledButton>
);
