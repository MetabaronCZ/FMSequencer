import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { Link } from 'ui/common/Link';

const authorUrl = 'https://github.com/MetabaronCZ';

const Container = styled.div`
    ${Text.Small};
    color: ${({ theme }) => theme.color.grey2};
    max-width: ${({ theme }) => theme.dimensions.page.width};
    padding: 0 ${toVU(2)};
    margin: 0 auto;
`;

export const Footer: React.FC = () => (
    <Container>
        Copyright &copy; 2022 MetabaronCZ (<Link href={authorUrl} target="_blank">{authorUrl}</Link>). All Rights Reserved.
    </Container>
);
