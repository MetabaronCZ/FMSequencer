import styled from 'styled-components';

import { Text } from 'ui/common/Text';

interface StyledProps {
  readonly $inverse: boolean;
}

export const Label = styled.label<StyledProps>`
  ${Text.Default};
  color: ${({ theme, $inverse }) => ($inverse ? theme.color.white : '')};
`;
