import React from 'react';
import styled from 'styled-components';

import { Text } from 'ui/common/Text';
import { OnClick, clickOnly } from 'ui/event';
import { toVU } from 'ui/typography';

const StyledButton = styled.button`
  ${Text.Default};
  display: block;
  height: ${toVU(2)};
  padding: 0 ${toVU(0.5)};
  background: ${({ theme }) => theme.color.grey2};
  color: ${({ theme }) => theme.color.black};
  text-align: center;
  border: none;
  cursor: pointer;
`;

const StyledText = styled.span`
  position: relative;
  top: 2px;
  margin-left: -3px;
  font-size: 8px;
  font-weight: bold;
`;

interface Props {
  readonly ico: string;
  readonly text?: string;
  readonly title: string;
  readonly onClick: OnClick;
}

export const PlaybackButton: React.FC<Props> = ({
  ico,
  text,
  title,
  onClick,
}) => {
  return (
    <StyledButton type="button" title={title} onClick={clickOnly(onClick)}>
      {ico}
      {!!text && <StyledText>{text}</StyledText>}
    </StyledButton>
  );
};
