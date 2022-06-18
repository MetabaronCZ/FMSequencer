import styled from 'styled-components';
import { toVU } from 'ui/typography';

const defaultSize = 1; // in unitless flex width
const defaultGapSize = 1; // in multiples of vertical unit

interface StyledContainerProps {
  readonly $gap?: number;
}

interface StyledRowProps {
  readonly $gap?: number;
  readonly $size?: number;
}

interface StyledColumnProps {
  readonly $size?: number;
}

export const Grid = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => toVU($gap ?? defaultGapSize)};
  height: 100%;
  margin-bottom: ${toVU(2)};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const GridRow = styled.div<StyledRowProps>`
  display: flex;
  flex-direction: row;
  flex: ${({ $size }) => $size ?? ''};
  gap: ${({ $gap }) => toVU($gap ?? defaultGapSize)};
  overflow-y: ${({ $size }) => ($size ? 'auto' : '')};
  min-height: 0; /* fix layout oveflow */
`;

export const GridColumn = styled.div<StyledColumnProps>`
  flex: ${({ $size }) => $size ?? defaultSize};
`;
