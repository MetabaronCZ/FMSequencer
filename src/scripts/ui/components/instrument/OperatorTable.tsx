import styled from 'styled-components';

import { Text } from 'ui/common/Text';
import { toVU } from 'ui/typography';

interface StyledProps {
  readonly $inverse: boolean;
}

export const OperatorTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    ${Text.Default};
    font-weight: normal;
  }
`;

export const OperatorTableRow = styled.tr<StyledProps>`
  & > * {
    padding: ${toVU(0.5)} 2px;
    background-color: ${({ theme, $inverse }) =>
      $inverse ? theme.color.grey1 : ''};
  }
`;
