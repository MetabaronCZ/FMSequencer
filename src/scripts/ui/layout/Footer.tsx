import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

const Container = styled.div`
    ${Text.Default};
    color: ${({ theme }) => theme.color.white};
    max-width: ${({ theme }) => theme.dimensions.page.width};
    padding: 0 ${toVU(2)};
    margin: 0 auto;
`;

export const Footer: React.FC = () => (
    <Container>
        footer
    </Container>
);
