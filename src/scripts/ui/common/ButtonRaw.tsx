import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { clickOnly, OnClick } from 'ui/event';

const StyledButton = styled.button`
    ${Text.Default};
    display: inline-block;
    padding: 0 ${toVU(0.5)};
    background: ${({ theme }) => theme.color.greyLightest};
    border: none;
    outline: none;
    cursor: pointer;

    &:hover,
    &:focus {
        outline: ${({ theme }) => theme.outline.black};
    }
`;

interface Props {
    readonly text: string;
    readonly title?: string;
    readonly onClick: OnClick;
}

export const ButtonRaw: React.FC<Props> = ({ text, title, onClick }) => (
    <StyledButton
        type="button"
        title={title}
        onClick={clickOnly(onClick)}
    >
        {text}
    </StyledButton>
);
