import { css } from 'styled-components';

import { Text } from 'ui/common/Text';
import { toVU } from 'ui/typography';

export interface InputStylesProps {
  readonly $inverse?: boolean;
  readonly $borderless?: boolean;
}

export const InputStyles = css<InputStylesProps>`
  ${Text.Default};
  height: ${({ theme }) => theme.lineHeight.default};
  padding: 0 ${toVU(0.5)};
  border: none;
  outline: none;
  border-bottom: ${({ theme, $borderless }) =>
    $borderless ? '' : theme.border.grey};
  background-color: ${({ theme, $inverse }) =>
    $inverse ? theme.color.white : theme.color.grey1};

  &:focus {
    border-color: ${({ theme, $borderless }) =>
      $borderless ? '' : theme.color.black};
    background-color: ${({ theme, $borderless }) =>
      $borderless ? theme.color.white : ''};
  }
`;
