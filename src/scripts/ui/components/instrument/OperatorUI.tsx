import React from 'react';

import { OperatorData } from 'modules/project/instrument/operator';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { EnvelopeUI } from 'ui/components/instrument/EnvelopeUI';
import { OperatorBase } from 'ui/components/instrument/OperatorBase';
import { EnvelopeCanvas } from 'ui/components/instrument/EnvelopeCanvas';

interface Props {
    readonly track: number;
    readonly operator: number;
    readonly data: OperatorData;
    readonly highlighted: boolean;
}

export const OperatorUI: React.FC<Props> = ({ track, operator, data, highlighted }) => {
    const { level, ratio, type, envelope } = data;
    return (
        <Grid>
            <GridRow>
                <GridColumn>
                    <OperatorBase
                        track={track}
                        operator={operator}
                        type={type}
                        level={level}
                        ratio={ratio}
                        highlighted={highlighted}
                    />
                </GridColumn>

                <GridColumn>
                    <EnvelopeUI
                        track={track}
                        operator={operator}
                        data={envelope}
                        highlighted={highlighted}
                    />
                </GridColumn>

                <GridColumn>
                    <EnvelopeCanvas envelope={envelope} />
                </GridColumn>
            </GridRow>
        </Grid>
    );
};
