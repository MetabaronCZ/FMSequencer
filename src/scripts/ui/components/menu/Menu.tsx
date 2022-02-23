import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { MenuLink } from 'ui/components/menu/MenuLink';
import { getMenuItems } from 'ui/components/menu/items';

const MenuList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    background: ${({ theme }) => theme.color.black};
`;

const MenuListItem = styled.li`
    border-right: ${({ theme }) => theme.border.white};
`;

export const Menu: React.FC = () => {
    const { t } = useTranslation();
    const items = getMenuItems(t);
    return (
        <nav>
            <MenuList>
                {items.map(({ title, path }, i) => (
                    <MenuListItem key={i}>
                        <MenuLink to={path}>
                            {title}
                        </MenuLink>
                    </MenuListItem>
                ))}
            </MenuList>
        </nav>
    );
};
