import React from 'react';
import styled from 'styled-components';

import { IcoID, icos } from 'ui/Icos';
import { Button } from 'ui/common/Button';
import { OnClick } from 'ui/event';
import { toVU } from 'ui/typography';

const StyledButton = styled(Button)`
  width: ${toVU(2)};
  padding: 0;
`;

interface Props {
  readonly className?: string;
  readonly title: string;
  readonly ico: IcoID;
  readonly disabled?: boolean;
  readonly onClick: OnClick;
}

export const IcoButton: React.FC<Props> = ({
  className,
  title,
  ico,
  disabled,
  onClick,
}) => (
  <StyledButton
    className={className}
    text={icos[ico]}
    title={title}
    disabled={disabled}
    onClick={onClick}
  />
);
