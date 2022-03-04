import React from 'react';

import { Page } from 'ui/layout/Page';
import { SongUI } from 'ui/components/SongUI';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';

export const SongView: React.FC = () => (
    <Page>
        <Grid>
            <GridRow>
                <GridColumn>
                    <SongUI />
                </GridColumn>

                <GridColumn />
            </GridRow>
        </Grid>
    </Page>
);
