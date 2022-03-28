import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { getPanLabel } from 'modules/project/instrument';
import {
    AlgorithmID, ALGORITHM_MAX, ALGORITHM_MIN,
    LEVEL_MAX, LEVEL_MIN, PAN_MAX, PAN_MIN,
} from 'modules/engine/config';

import { getSelectorValues } from 'ui/common/Selector';
import { SelectorField } from 'ui/common/SelectorField';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';

const algos = createRange(ALGORITHM_MIN, ALGORITHM_MAX);
const levels = createRange(LEVEL_MIN, LEVEL_MAX);
const pans = createRange(PAN_MIN, PAN_MAX);

const algoValues = getSelectorValues(algos, (algo) => ({
    label: `${algo}`,
    value: algo,
}));

const levelValues = getSelectorValues(levels, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

const panValues = getSelectorValues(pans, (val) => ({
    label: getPanLabel(val),
    value: val,
}));

interface Props {
    readonly track: number;
    readonly algorithm: AlgorithmID;
    readonly level: number;
    readonly pan: number;
}

export const InstrumentBase: React.FC<Props> = ({ track, algorithm, level, pan }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setInstrumentAlgorithm, setInstrumentLevel, setInstrumentPan } = projectSlice.actions;
    return (
        <Grid>
            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('algorithm')}
                        value={algorithm}
                        values={algoValues}
                        onChange={(value) => dispatch(
                            setInstrumentAlgorithm({
                                track,
                                data: value as AlgorithmID,
                            })
                        )}
                    />
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('level')}
                        value={level}
                        values={levelValues}
                        onChange={(value) => dispatch(
                            setInstrumentLevel({ track, data: value })
                        )}
                    />
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('pan')}
                        value={pan}
                        values={panValues}
                        onChange={(value) => dispatch(
                            setInstrumentPan({ track, data: value })
                        )}
                    />
                </GridColumn>
            </GridRow>
        </Grid>
    );
};
