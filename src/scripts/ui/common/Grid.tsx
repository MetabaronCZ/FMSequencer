import styled from 'styled-components';
import { toVU } from 'ui/typography';

export const Grid = styled.div`
    display: flex;
    flex-direction: column;
`;

export const GridRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: ${toVU(1)};

    &: last-child {
        margin-bottom: 0;
    }
`;

export const GridColumn = styled.div`
    flex: 1;
    margin-left: ${toVU(1)};

    & > * {
        width: 100%;
    }

    &:first-child {
        margin-left: 0;
    }
`;
