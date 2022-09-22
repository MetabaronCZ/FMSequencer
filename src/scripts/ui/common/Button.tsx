import React from 'react';
import styled from 'styled-components';

import { Text } from 'ui/common/Text';
import { OnClick, clickOnly } from 'ui/event';
import { toVU } from 'ui/typography';

const StyledButton = styled.button`
  ${Text.Default};
  display: inline-block;
  min-width: ${toVU(2)};
  line-height: ${toVU(2)};
  padding: 0 ${toVU(0.5)};
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.grey3};
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: ${({ theme }) => theme.outline.black};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.black};
  }

  & + & {
    margin-left: ${toVU(0.5)};
  }
`;

interface Props {
  readonly text: string;
  readonly title?: string;
  readonly disabled?: boolean;
  readonly onClick: OnClick;
}

export const Button: React.FC<Props> = (props) => {
  const { text, title, disabled = false, onClick } = props;
  return (
    <StyledButton
      type="button"
      title={title}
      disabled={disabled}
      onClick={clickOnly(onClick)}
    >
      {text}
    </StyledButton>
  );
};
