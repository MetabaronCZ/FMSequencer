import styled from 'styled-components';

import { Text } from 'ui/common/Text';
import { toVU } from 'ui/typography';

export const Toolbar = styled.div`
  ${Text.Default};
  display: flex;
  gap: ${toVU(1)};
`;
