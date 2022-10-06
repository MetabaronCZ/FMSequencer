import React from 'react';
import styled from 'styled-components';

import { OperatorData } from 'modules/project/instrument/operator';

import { Grid } from 'ui/common/Grid';
import { EnvelopeUI } from 'ui/components/instrument/EnvelopeUI';
import { OperatorBase } from 'ui/components/instrument/OperatorBase';
import { toVU } from 'ui/typography';

interface StyledProps {
  $highlighted: boolean;
}

const Container = styled.div<StyledProps>`
  padding: ${toVU(1)};
  background: ${({ theme, $highlighted }) =>
    $highlighted ? theme.color.grey1 : ''};
`;

interface Props {
  readonly track: number;
  readonly operator: number;
  readonly data: OperatorData;
  readonly highlighted: boolean;
}

export const OperatorUI: React.FC<Props> = ({
  track,
  operator,
  data,
  highlighted,
}) => {
  const { level, ratio, type, envelope } = data;
  return (
    <Container $highlighted={highlighted}>
      <Grid>
        <OperatorBase
          track={track}
          operator={operator}
          type={type}
          level={level}
          ratio={ratio}
          highlighted={highlighted}
        />

        <EnvelopeUI
          track={track}
          operator={operator}
          data={envelope}
          highlighted={highlighted}
        />
      </Grid>
    </Container>
  );
};
