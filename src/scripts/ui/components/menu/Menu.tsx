import React from 'react';
import styled from 'styled-components';
import { TFunction, useTranslation } from 'react-i18next';

import { paths } from 'ui/paths';
import { MenuLink } from 'ui/components/menu/MenuLink';

interface MenuItem {
    readonly title: string;
    readonly path: string;
}
const getMenuItems = (t: TFunction): MenuItem[] => [
    { title: t('instruments'), path: paths.INSTRUMENTS },
    { title: t('master'), path: paths.MASTER },
];

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
