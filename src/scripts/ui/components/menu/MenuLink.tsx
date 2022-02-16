import React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';
import { useMatch, useResolvedPath } from 'react-router';

import { toVU } from 'modules/typography';
import { Text } from 'ui/common/Text';

interface StyledProps {
    readonly $isActive: boolean;
}

const StyledLink = styled(Link)<StyledProps>`
    ${Text.Default};
    position: relative;
    display: block;
    padding: ${toVU(1)} ${toVU(2)};
    color: ${({ theme, $isActive }) => $isActive ? theme.color.black : theme.color.white};
    background: ${({ theme, $isActive }) => $isActive ? theme.color.white : 'transparent'};
    text-transform: uppercase;
    text-decoration: none;

    &:focus {
        outline: ${({ theme }) => theme.outline.default};
    }
`;

export const MenuLink: React.FC<LinkProps> = ({ children, to, ...props }) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    const isActive = !!match;
    return (
        <StyledLink
            $isActive={isActive}
            to={to}
            {...props}
        >
            {children}
        </StyledLink>
    );
};
