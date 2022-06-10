import React from 'react';

import { useAppSelector } from 'store';

import { getPatternSteps } from 'modules/project/pattern';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { PatternSteps } from 'ui/components/pattern/PatternSteps';
import { PatternToolbar } from 'ui/components/pattern/PatternToolbar';

export const PatternUI: React.FC = () => {
    const { tracks } = useAppSelector((state) => state.project);
    const { track, pattern } = useAppSelector((state) => state.session);

    const { patterns } = tracks[track];

    const data = patterns[pattern];
    const steps = getPatternSteps(data);

    return (
        <Grid>
            <GridRow>
                <GridColumn>
                    <PatternToolbar
                        track={track}
                        pattern={pattern}
                        patterns={patterns}
                    />
                </GridColumn>
            </GridRow>

            <GridRow $size={1}>
                <GridColumn>
                    <PatternSteps
                        track={track}
                        pattern={pattern}
                        beats={data.beats}
                        division={data.division}
                        steps={steps}
                    />
                </GridColumn>
            </GridRow>
        </Grid>
    );
};
