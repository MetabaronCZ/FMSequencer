import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { LEVEL_MAX, LEVEL_MIN } from 'modules/engine/config';
import { TEMPO_MAX, TEMPO_MIN } from 'modules/project/config';

import { TextField } from 'ui/common/TextField';
import { getSelectorValues } from 'ui/common/Selector';
import { SelectorField } from 'ui/common/SelectorField';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';

const tempos = createRange(TEMPO_MIN, TEMPO_MAX);
const levels = createRange(LEVEL_MIN, LEVEL_MAX);

const tempoValues = getSelectorValues(tempos, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

const levelValues = getSelectorValues(levels, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

export const ProjectUI: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        setName, setTempo, setDescription,
        setMasterLevel,
    } = projectSlice.actions;

    const {
        name, description, tempo,
        master,
    } = useAppSelector((state) => state.project);

    return (
        <Grid>
            <GridRow>
                <GridColumn>
                    <TextField
                        label={t('name')}
                        value={name}
                        onChange={(value) => dispatch(setName(value))}
                    />
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('tempo')}
                        unit={t('bpm')}
                        value={tempo}
                        values={tempoValues}
                        onChange={(value) => dispatch(setTempo(value))}
                    />
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <SelectorField
                        label={t('level')}
                        value={master.level}
                        values={levelValues}
                        onChange={(value) => dispatch(
                            setMasterLevel(value)
                        )}
                    />
                </GridColumn>
            </GridRow>

            <GridRow>
                <GridColumn>
                    <TextField
                        label={t('description')}
                        value={description}
                        placeholder="—"
                        onChange={(value) => dispatch(setDescription(value))}
                        textarea
                    />
                </GridColumn>
            </GridRow>
        </Grid>
    );
};
