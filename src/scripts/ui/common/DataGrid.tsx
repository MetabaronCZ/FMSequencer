import styled from 'styled-components';
import { toVU } from 'ui/typography';

export const DataGrid = styled.div`
    display: flex;
    flex-direction: row;
`;

export const DataGridRow = styled.div`
    margin-bottom: ${toVU(1)};

    &: last-child {
        margin-bottom: 0;
    }

    & > * {
        width: 100%;
    }
`;

interface StyledProps {
    readonly isVertical?: boolean;
}

export const DataGridColumn = styled.div<StyledProps>`
    flex: 0 0 auto;
    margin-left: ${toVU(1)};

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        flex: 1;
        margin-right: 0;
    }

    ${({ theme, isVertical }) => !!isVertical && `
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        text-align: right;
        margin-left: ${toVU(2)};
        border-right: ${theme.border.grey};

        &:first-child {
            margin-left: 0;
            border-right: none;
        }
    `};
`;
