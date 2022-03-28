import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import {
    OscillatorTypeID, oscillatorTypes, ratios,
    LEVEL_MAX, LEVEL_MIN, RatioID,
} from 'modules/engine/config';

import { Heading } from 'ui/common/Heading';
import { getSelectorValues } from 'ui/common/Selector';
import { SelectorField } from 'ui/common/SelectorField';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';

const levels = createRange(LEVEL_MIN, LEVEL_MAX);
const oscTypes = oscillatorTypes.slice(0) as OscillatorTypeID[];

const shapeValues = getSelectorValues(oscTypes, (item) => ({
    label: item,
    value: item,
}));

const levelValues = getSelectorValues(levels, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

const ratioValues = getSelectorValues([...ratios], (val) => ({
    label: toFixedLength(val, 5),
    value: val,
}));

interface Props {
    readonly track: number;
    readonly operator: number;
    readonly type: OscillatorTypeID;
    readonly level: number;
    readonly ratio: RatioID;
}

export const OperatorBase: React.FC<Props> = ({ track, operator, type, level, ratio }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        setInstrumentOperatorType,
        setInstrumentOperatorLevel, setInstrumentOperatorRatio,
    } = projectSlice.actions;

    return (
        <Grid>
            <GridRow>
                <GridColumn>
                    <Heading tag="h2">
                        {`${t('operator')} ${operator + 1}`}
                    </Heading>
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('shape')}
                        value={type}
                        values={shapeValues}
                        onChange={(value) => dispatch(
                            setInstrumentOperatorType({
                                track,
                                operator,
                                data: value,
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
                            setInstrumentOperatorLevel({
                                track,
                                operator,
                                data: value,
                            })
                        )}
                    />
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('ratio')}
                        value={ratio}
                        values={ratioValues}
                        onChange={(value) => dispatch(
                            setInstrumentOperatorRatio({
                                track,
                                operator,
                                data: value,
                            })
                        )}
                    />
                </GridColumn>
            </GridRow>
        </Grid>
    );
};
