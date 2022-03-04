import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { clickOnly, OnClick } from 'ui/event';

const StyledButton = styled.button`
    ${Text.Default};
    display: inline-block;
    padding: 0 ${toVU(1)};
    background: ${({ theme }) => theme.color.white};
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.color.greyLightest};
    }
`;

interface Props {
    readonly text: string;
    readonly onClick: OnClick;
}

export const ButtonRaw: React.FC<Props> = ({ text, onClick }) => (
    <StyledButton
        type="button"
        onClick={clickOnly(onClick)}
    >
        {text}
    </StyledButton>
);
