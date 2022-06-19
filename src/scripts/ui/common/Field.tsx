import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Label } from 'ui/common/Label';

const Container = styled.div`
  display: flex;
`;

interface Props extends PropsWithChildren {
  readonly id: string;
  readonly label: string;
  readonly inverse?: boolean;
}

export const Field: React.FC<Props> = ({ id, label, inverse, children }) => (
  <Container>
    <Label htmlFor={id} $inverse={!!inverse}>
      {label}
    </Label>

    {children}
  </Container>
);
