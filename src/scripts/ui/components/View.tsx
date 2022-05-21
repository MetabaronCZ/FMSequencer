import React from 'react';

import { SongUI } from 'ui/components/SongUI';
import { PatternUI } from 'ui/components/PatternUI';
import { SequenceUI } from 'ui/components/SequenceUI';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { InstrumentUI } from 'ui/components/instrument/InstrumentUI';

export const View: React.FC = () => (
    <Grid $gap={2}>
        <GridRow $gap={2}>
            <GridColumn>
                <Grid $gap={2}>
                    <GridRow $gap={2}>
                        <GridColumn>
                            <SequenceUI />
                        </GridColumn>
                    </GridRow>

                    <GridRow $gap={2}>
                        <GridColumn>
                            <SongUI />
                        </GridColumn>
                    </GridRow>
                </Grid>
            </GridColumn>

            <GridColumn>
                <PatternUI />
            </GridColumn>

            <GridColumn>
                <InstrumentUI />
            </GridColumn>
        </GridRow>
    </Grid>
);
