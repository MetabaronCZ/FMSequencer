import styled from 'styled-components';
import { toVU } from 'ui/typography';

const defaultSize = 1; // in unitless flex width
const defaultGapSize = 1; // in multiples of vertical unit

interface StyledSpacingProps {
    readonly $gap?: number;
}

interface StyledColumnProps {
    readonly $size?: number;
}

export const Grid = styled.div<StyledSpacingProps>`
    display: flex;
    flex-direction: column;
    gap: ${({ $gap }) => toVU($gap ?? defaultGapSize)};
    margin-bottom: ${toVU(2)};

    &:last-child {
        margin-bottom: 0;
    }
`;

export const GridRow = styled.div<StyledSpacingProps>`
    display: flex;
    flex-direction: row;
    gap: ${({ $gap }) => toVU($gap ?? defaultGapSize)};
`;

export const GridColumn = styled.div<StyledColumnProps>`
    flex: ${({ $size }) => $size ?? defaultSize};
`;
