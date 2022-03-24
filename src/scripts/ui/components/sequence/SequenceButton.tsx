import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { clickOnly, OnClick } from 'ui/event';

interface StyledProps {
    readonly $isActive: boolean;
}

const StyledButton = styled.button<StyledProps>`
    display: inline-block;
    height: ${toVU(3)};
    width: ${toVU(3)};
    background: transparent;
    border: ${({ theme }) => theme.border.default};
    border-radius: ${({ theme }) => theme.radius.default};
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

export const SequenceButton: React.FC<Props> = ({ text, title, isActive, onClick }) => (
    <StyledButton
        $isActive={isActive}
        type="button"
        title={title}
        onClick={clickOnly(onClick)}
    >
        {text}
    </StyledButton>
);
