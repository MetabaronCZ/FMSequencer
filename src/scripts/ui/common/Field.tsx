import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Label } from 'ui/common/Label';
import { toVU } from 'ui/typography';

const Container = styled.div`
  display: flex;
  gap: ${toVU(0.5)};
`;

interface Props extends PropsWithChildren {
  readonly id: string;
  readonly label?: string;
  readonly inverse?: boolean;
}

export const Field: React.FC<Props> = ({ id, label, inverse, children }) => (
  <Container>
    {!!label && (
      <Label htmlFor={id} $inverse={!!inverse}>
        {label}
      </Label>
    )}
    {children}
  </Container>
);
