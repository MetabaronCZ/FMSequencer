import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getSaveFileUrl, loadFile, releaseSaveFileUrl } from 'core/file';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { ProjectConfig } from 'modules/project';

import { confirm } from 'ui/dialog';
import { toVU } from 'ui/typography';
import { Button } from 'ui/common/Button';
import { InfoBox } from 'ui/layout/Header/InfoBox';

export interface ProjectSaveData {
    readonly data: string;
    readonly timestamp: string;
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 ${toVU(2)};
    gap: ${toVU(1)};
`;

export const Actions: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { project } = useAppSelector((state) => state);
    const [saveData, setSaveData] = useState<ProjectSaveData | null>(null);
    const { loadProject } = projectSlice.actions;

    const cancelSave = (): void => setSaveData(null);

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
        cancelSave();
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
        <Container>
            <Button
                text={t('projectCreate')}
                onClick={create}
            />

            <Button
                text={t('projectLoad')}
                onClick={load}
            />

            <Button
                text={t('projectSave')}
                onClick={save}
            />

            {!!saveData && (
                <InfoBox
                    name={project.name}
                    data={saveData}
                    onClose={cancelSave}
                />
            )}
        </Container>
    );
};
