import React from 'react';

import { Page } from 'ui/layout/Page';
import { SongUI } from 'ui/components/SongUI';
import { ProjectUI } from 'ui/components/ProjectUI';
import { PatternUI } from 'ui/components/PatternUI';
import { SequenceUI } from 'ui/components/SequenceUI';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { InstrumentUI } from 'ui/components/instrument/InstrumentUI';

export const HomeView: React.FC = () => (
    <Page>
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
                    <Grid $gap={2}>
                        <GridRow $gap={2}>
                            <GridColumn>
                                <ProjectUI />
                            </GridColumn>
                        </GridRow>

                        <GridRow $gap={2}>
                            <GridColumn>
                                <InstrumentUI />
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </GridColumn>
            </GridRow>
        </Grid>
    </Page>
);
