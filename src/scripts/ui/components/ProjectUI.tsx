import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';
import { getSaveFileUrl, loadFile, releaseSaveFileUrl } from 'core/file';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { ProjectConfig } from 'modules/project';
import { LEVEL_MAX, LEVEL_MIN } from 'modules/engine/config';
import { TEMPO_MAX, TEMPO_MIN } from 'modules/project/config';

import { confirm } from 'ui/dialog';
import { Link } from 'ui/common/Link';
import { getSelection } from 'ui/event';
import { Toolbar } from 'ui/common/Toolbar';
import { Heading } from 'ui/common/Heading';
import { InfoBox } from 'ui/common/InfoBox';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { TextField } from 'ui/common/TextField';
import { SelectorField } from 'ui/common/SelectorField';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';

interface SaveData {
    readonly data: string;
    readonly timestamp: string;
}

const tempos = createRange(TEMPO_MIN, TEMPO_MAX);
const levels = createRange(LEVEL_MIN, LEVEL_MAX);

const tempoValues = getSelection(tempos, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

const levelValues = getSelection(levels, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

export const ProjectUI: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [saveData, setSaveData] = useState<SaveData | null>(null);
    const { setName, setTempo, setMasterLevel, loadProject } = projectSlice.actions;

    const { project } = useAppSelector((state) => state);
    const { name, tempo, master } = project;
    const fileName = `${project.name}.json`;

    // free URL blob data memory when data changes
    useEffect(() => {
        return () => {
            if (saveData) {
                releaseSaveFileUrl(saveData.data);
            }
        };
    });

    // reset save data on project data update
    useEffect(() => {
        setSaveData(null);
    }, [project]);

    const create = confirm(t('confirmProjectChange'), (data: ProjectConfig) => {
        dispatch(loadProject(data));
    });

    const load = confirm(t('confirmProjectChange'), () => {
        loadFile()
            .then((data) => dispatch(loadProject(data)))
            .catch(() => alert(t('alertInvalidFileSelected')));
    });

    const save = (): void => {
        setSaveData({
            data: getSaveFileUrl(project),
            timestamp: new Date().toLocaleTimeString(),
        });
    };

    return (
        <>
            <Heading tag="h2">{t('project')}</Heading>

            <Toolbar>
                <ButtonRaw text={t('projectCreate')} onClick={create} />
                <ButtonRaw text={t('projectLoad')} onClick={load} />
                <ButtonRaw text={t('projectSave')} onClick={save} />
            </Toolbar>

            {!!saveData && (
                <InfoBox>
                    {t('saveToDisk1')} <Link href={saveData.data} download={fileName}>{t('saveToDisk2')}</Link> ({saveData.timestamp}) {t('saveToDisk3')}.
                </InfoBox>
            )}

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

                    <GridColumn $size={2}>
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
            </Grid>
        </>
    );
};
