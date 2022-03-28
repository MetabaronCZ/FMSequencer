import React from 'react';

import { InstrumentData } from 'modules/project/instrument';

import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { FilterUI } from 'ui/components/instrument/FilterUI';
import { OperatorList } from 'ui/components/instrument/OperatorList';
import { AnalyserCanvas } from 'ui/components/instrument/AnalyserCanvas';
import { InstrumentBase } from 'ui/components/instrument/InstrumentBase';
import { AlgorithmCanvas } from 'ui/components/instrument/AlgorithmCanvas';

interface Props {
    readonly track: number;
    readonly instrument: InstrumentData;
}

export const InstrumentUI: React.FC<Props> = ({ track, instrument }) => {
    const { algorithm, level, pan, filter, operators } = instrument;
    return (
        <>
            <Grid>
                <GridRow>
                    <GridColumn>
                        <AlgorithmCanvas algorithm={algorithm} />
                    </GridColumn>

                    <GridColumn>
                        <InstrumentBase
                            track={track}
                            algorithm={algorithm}
                            level={level}
                            pan={pan}
                        />
                    </GridColumn>

                    <GridColumn>
                        <FilterUI
                            track={track}
                            data={filter}
                        />
                    </GridColumn>

                    <GridColumn>
                        <AnalyserCanvas track={track} />
                    </GridColumn>

                    <GridColumn />
                    <GridColumn />
                </GridRow>
            </Grid>

            <OperatorList
                track={track}
                data={operators}
            />
        </>
    );
};
