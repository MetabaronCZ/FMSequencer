import styled from 'styled-components';

import { toVU } from 'ui/typography';

export const Infobox = styled.p`
  padding: ${toVU(1)};
  background: ${({ theme }) => theme.color.grey1};
  border: ${({ theme }) => theme.border.dashed};
`;
