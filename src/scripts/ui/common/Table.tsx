import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

const StyledTable = styled.table`
    border-collapse: collapse;
    margin-bottom: ${toVU(2)};

    &:last-child {
        margin-bottom: 0;
    }
`;

export const TableRow = styled.tr`
    & > * {
        padding-bottom: ${toVU(1)};
    }

    &:last-child > * {
        padding-bottom: 0;
    }
`;

export const TableItem = styled.td`
    ${Text.Default};
    padding-right: ${toVU(1)};

    &:last-child {
        padding-right: 0;
    }
`;

export const Table: React.FC = ({ children }) => (
    <StyledTable>
        <tbody>
            {children}
        </tbody>
    </StyledTable>
);
