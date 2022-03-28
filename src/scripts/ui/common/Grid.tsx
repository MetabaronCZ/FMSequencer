import styled from 'styled-components';
import { toVU } from 'ui/typography';

export const Grid = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${toVU(1)};
    margin-bottom: ${toVU(2)};

    &:last-child {
        margin-bottom: 0;
    }
`;

export const GridRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${toVU(1)};
`;

export const GridColumn = styled.div`
    flex: 1;
`;
