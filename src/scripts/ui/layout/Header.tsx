import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    max-width: ${({ theme }) => theme.dimensions.page.width};
    padding: 0 ${toVU(2)};
    margin: 0 auto;
`;

const HeaderItem = styled.div`
    ${Text.Default};
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.white};
`;

export const Header: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Container>
            <HeaderItem>
                {t('app')}
            </HeaderItem>
        </Container>
    );
};
