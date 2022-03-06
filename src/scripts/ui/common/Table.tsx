import React from 'react';
import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

const StyledTable = styled.table`
    width: 100%;
    border-spacing: 0;

    & > thead > tr:first-child > th {
        &:first-child {
            border-top-left-radius: ${({ theme }) => theme.radius.default};
        }

        &:last-child {
            border-top-right-radius: ${({ theme }) => theme.radius.default};
        }
    }

    & > tbody > tr {
        & > td:first-child {
            border-left: ${({ theme }) => theme.border.default};
        }

        & > td:last-child {
            border-right: ${({ theme }) => theme.border.default};
        }

        &:last-child {
            & > td {
                border-bottom: ${({ theme }) => theme.border.default};

                &:first-child {
                    border-bottom-left-radius: ${({ theme }) => theme.radius.default};
                }

                &:last-child {
                    border-bottom-right-radius: ${({ theme }) => theme.radius.default};
                }
            }
        }
    }
`;

const TableHeader = styled.th`
    ${Text.Default};
    padding: ${toVU(0.5)} ${toVU(1)};
    color: ${({ theme }) => theme.color.white};
    background: ${({ theme }) => theme.color.black};
    font-weight: bold;
    text-align: left;
`;

interface StyledTableRowProps {
    readonly $footer?: boolean;
}

export const TableRow = styled.tr<StyledTableRowProps>`
    ${({ $footer, theme }) => !!$footer && `
        & > td {
            border-top: ${theme.border.grey};
        }
    `}
`;

interface StyledTableItemProps {
    readonly $align?: AlignSetting;
}

export const TableItem = styled.td<StyledTableItemProps>`
    ${Text.Default};
    padding: ${toVU(0.5)} ${toVU(1)};
    text-align: ${({ $align }) => $align ?? 'left'};
`;

interface Props {
    readonly headers: string[];
}

export const Table: React.FC<Props> = ({ headers, children }) => (
    <StyledTable>
        {!!headers && headers.length && (
            <thead>
                <tr>
                    {headers.map((header, i) => (
                        <TableHeader key={i}>
                            {header}
                        </TableHeader>
                    ))}
                </tr>
            </thead>
        )}
        <tbody>
            {children}
        </tbody>
    </StyledTable>
);
