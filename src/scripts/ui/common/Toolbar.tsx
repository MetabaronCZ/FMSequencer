import styled, { css } from 'styled-components';

import { Text } from 'ui/common/Text';
import { toVU } from 'ui/typography';

export const Toolbar = styled.ul`
  list-style-type: none;
  display: flex;
  gap: ${toVU(1)};
  padding-bottom: calc(${toVU(1)} - 1px);
  border-bottom: 1px dashed ${({ theme }) => theme.color.grey3};
`;

interface StyledItemProps {
  readonly isActions?: boolean;
}

export const ToolbarItem = styled.li<StyledItemProps>`
  ${Text.Default};
  display: flex;
  flex-direction: row;
  justify-content: end;

  ${({ theme, isActions }) =>
    isActions
      ? css`
          flex: 1;
          text-align: right;
        `
      : css`
          & > *:not(:last-child)::after {
            display: block;
            content: '•';
            padding-right: ${toVU(0.5)};
            color: ${theme.color.grey2};
          }
        `};
`;
