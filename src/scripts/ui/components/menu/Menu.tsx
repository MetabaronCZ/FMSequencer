import React from 'react';
import styled from 'styled-components';
import { TFunction, useTranslation } from 'react-i18next';

import { PathID, paths } from 'modules/paths';
import { MenuLink } from 'ui/components/menu/MenuLink';

interface MenuItem {
    readonly title: string;
    readonly path: PathID;
}
const getMenuItems = (t: TFunction): MenuItem[] => [
    { title: t('instruments'), path: 'INSTRUMENTS' },
    { title: t('master'), path: 'MASTER' },
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
                        <MenuLink to={paths[path]}>
                            {title}
                        </MenuLink>
                    </MenuListItem>
                ))}
            </MenuList>
        </nav>
    );
};
