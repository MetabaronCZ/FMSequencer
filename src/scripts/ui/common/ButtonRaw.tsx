import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { clickOnly, OnClick } from 'ui/event';

const StyledButton = styled.button`
    ${Text.Default};
    display: inline-block;
    padding: 0 ${toVU(0.5)};
    background: ${({ theme }) => theme.color.grey1};
    border: none;
    outline: none;
    cursor: pointer;

    &:hover,
    &:focus {
        outline: ${({ theme }) => theme.outline.black};
    }

    &:disabled {
        color: ${({ theme }) => theme.color.white};
        background-color: ${({ theme }) => theme.color.black};
    }
`;

interface Props {
    readonly text: string;
    readonly title?: string;
    readonly disabled?: boolean;
    readonly onClick: OnClick;
}

export const ButtonRaw: React.FC<Props> = ({ text, title, disabled, onClick }) => (
    <StyledButton
        type="button"
        title={title}
        disabled={disabled}
        onClick={clickOnly(onClick)}
    >
        {text}
    </StyledButton>
);
