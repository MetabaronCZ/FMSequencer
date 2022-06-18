import styled from 'styled-components';

import { Text } from 'ui/common/Text';
import { toVU } from 'ui/typography';

interface StyledProps {
  readonly $inverse: boolean;
}

export const Label = styled.label<StyledProps>`
  ${Text.Default};
  color: ${({ theme, $inverse }) => ($inverse ? theme.color.white : '')};
  margin-right: ${toVU(0.5)};
`;
