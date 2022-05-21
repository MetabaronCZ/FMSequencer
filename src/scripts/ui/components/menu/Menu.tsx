import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

const MenuList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    background: ${({ theme }) => theme.color.black};
`;

const MenuListItem = styled.li`
    ${Text.Default};
    position: relative;
    padding: ${toVU(1)} ${toVU(2)};
    color: ${({ theme }) => theme.color.white};
    background: transparent;
    text-transform: uppercase;
`;

export const Menu: React.FC = () => {
    const { t } = useTranslation();
    return (
        <nav>
            <MenuList>
                <MenuListItem>
                    {t('home')}
                </MenuListItem>
            </MenuList>
        </nav>
    );
};
