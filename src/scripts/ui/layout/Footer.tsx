import React from 'react';
import styled from 'styled-components';

import { Link } from 'ui/common/Link';
import { Text } from 'ui/common/Text';
import { toVU } from 'ui/typography';

const authorUrl = 'https://github.com/MetabaronCZ';

const Container = styled.div`
  ${Text.Small};
  color: ${({ theme }) => theme.color.grey3};
  max-width: ${({ theme }) => theme.dimensions.page.width};
  padding: 0 ${toVU(2)};
  margin: 0 auto;
`;

export const Footer: React.FC = () => {
  const AuthorLink = (
    <Link href={authorUrl} target="_blank">
      {authorUrl}
    </Link>
  );
  return (
    <Container>
      Copyright &copy; 2022 MetabaronCZ ({AuthorLink}). All Rights Reserved.
    </Container>
  );
};
