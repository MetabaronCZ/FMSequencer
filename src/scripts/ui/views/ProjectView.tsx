import React from 'react';
import { useTranslation } from 'react-i18next';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { TEMPO_MAX, TEMPO_MIN } from 'modules/project/config';

import { Page } from 'ui/layout/Page';
import { Slider } from 'ui/common/Slider';
import { Textarea } from 'ui/common/Textarea';
import { TextInput } from 'ui/common/TextInput';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';

export const ProjectView: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { setName, setTempo, setDescription } = projectSlice.actions;
    const { name, description, tempo } = useAppSelector((state) => state.project);
    return (
        <Page>
            <Grid>
                <GridRow>
                    <GridColumn>
                        <TextInput
                            label={t('name')}
                            value={name}
                            onChange={(value) => dispatch(setName(value))}
                        />
                    </GridColumn>

                    <GridColumn />
                    <GridColumn />
                </GridRow>

                <GridRow>
                    <GridColumn>
                        <Slider
                            label={`${t('tempo')}: ${tempo} ${t('bpm')}`}
                            min={TEMPO_MIN}
                            max={TEMPO_MAX}
                            value={tempo}
                            onChange={(value) => dispatch(setTempo(value))}
                        />
                    </GridColumn>

                    <GridColumn />
                    <GridColumn />
                </GridRow>

                <GridRow>
                    <GridColumn>
                        <Textarea
                            label={t('description')}
                            value={description}
                            placeholder="-"
                            onChange={(value) => dispatch(setDescription(value))}
                        />
                    </GridColumn>

                    <GridColumn />
                    <GridColumn />
                </GridRow>
            </Grid>
        </Page>
    );
};
