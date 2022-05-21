import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { confirm } from 'ui/dialog';
import { Button } from 'ui/common/Button';
import { Toolbar } from 'ui/common/Toolbar';
import { Keyboard } from 'ui/components/Keyboard';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { FilterUI } from 'ui/components/instrument/FilterUI';
import { OperatorList } from 'ui/components/instrument/OperatorList';
import { InstrumentBase } from 'ui/components/instrument/InstrumentBase';
import { AlgorithmCanvas } from 'ui/components/instrument/AlgorithmCanvas';

export const InstrumentUI: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { track } = useAppSelector((state) => state.session);
    const { tracks } = useAppSelector((state) => state.project);
    const { resetInstrument } = projectSlice.actions;

    const { name, algorithm, level, pan, filter, operators } = tracks[track].instrument;

    const reset = confirm(t('confirmInstrumentReset'), () => dispatch(
        resetInstrument({
            track,
            data: null,
        })
    ));

    return (
        <Grid>
            <GridRow>
                <GridColumn>
                    <Toolbar>
                        {name}

                        {' | '}

                        <Button text={t('reset')} onClick={reset} />
                    </Toolbar>
                </GridColumn>
            </GridRow>

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
                    <FilterUI track={track} data={filter} />
                </GridColumn>
            </GridRow>

            <GridRow />

            <GridRow $size={1}>
                <GridColumn>
                    <OperatorList track={track} data={operators} />
                    <Keyboard track={track} />
                </GridColumn>
            </GridRow>
        </Grid>
    );
};
