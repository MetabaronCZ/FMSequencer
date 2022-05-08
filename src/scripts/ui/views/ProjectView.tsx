import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getSaveFileUrl, loadFile, releaseSaveFileUrl } from 'core/file';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { ProjectConfig } from 'modules/project';

import { Page } from 'ui/layout/Page';
import { Link } from 'ui/common/Link';
import { alert, confirm } from 'ui/dialog';
import { Toolbar } from 'ui/common/Toolbar';
import { InfoBox } from 'ui/common/InfoBox';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { ProjectUI } from 'ui/components/ProjectUI';

interface SaveData {
    readonly data: string;
    readonly timestamp: string;
}

export const ProjectView: React.FC = () => {
    const [saveData, setSaveData] = useState<SaveData | null>(null);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { project } = useAppSelector((state) => state);
    const { loadProject } = projectSlice.actions;
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
        <Page>
            <Toolbar>
                <ButtonRaw
                    text={t('projectCreate')}
                    onClick={create}
                />

                <ButtonRaw
                    text={t('projectLoad')}
                    onClick={load}
                />

                <ButtonRaw
                    text={t('projectSave')}
                    onClick={save}
                />
            </Toolbar>

            {!!saveData && (
                <InfoBox>
                    {t('saveToDisk1')} <Link href={saveData.data} download={fileName}>{t('saveToDisk2')}</Link> ({saveData.timestamp}) {t('saveToDisk3')}.
                </InfoBox>
            )}

            <ProjectUI />
        </Page>
    );
};
