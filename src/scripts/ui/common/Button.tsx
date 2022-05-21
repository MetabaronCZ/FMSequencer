import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { clickOnly, OnClick } from 'ui/event';

interface StyledProps {
    readonly $inverse: boolean;
}

const StyledButton = styled.button<StyledProps>`
    ${Text.Default};
    display: inline-block;
    padding: 0 ${toVU(0.5)};
    background: ${({ theme, $inverse }) => $inverse ? theme.color.grey2 : theme.color.grey1};
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
    readonly inverse?: boolean;
    readonly disabled?: boolean;
    readonly onClick: OnClick;
}

export const Button: React.FC<Props> = (props) => {
    const { text, title, inverse = false, disabled = false, onClick } = props;
    return (
        <StyledButton
            type="button"
            title={title}
            disabled={disabled}
            onClick={clickOnly(onClick)}
            $inverse={inverse}
        >
            {text}
        </StyledButton>
    );
};
