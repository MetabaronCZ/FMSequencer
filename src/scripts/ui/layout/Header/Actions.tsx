import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getSaveFileUrl, loadFile, releaseSaveFileUrl } from 'core/file';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { ProjectConfig } from 'modules/project';

import { Button } from 'ui/common/Button';
import { Link } from 'ui/common/Link';
import { Modal } from 'ui/common/Modal';
import { confirm } from 'ui/dialog';
import { toVU } from 'ui/typography';

export interface ProjectSaveData {
  readonly data: string;
  readonly timestamp: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: ${toVU(1)};
  flex: 1;
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
      <div>
        <Button text={t('projectCreate')} onClick={create} />
        <Button text={t('projectLoad')} onClick={load} />
        <Button text={t('projectSave')} onClick={save} />
      </div>

      {!!saveData && (
        <Modal title={t('projectSaveModal')} onClose={cancelSave}>
          {t('saveToDisk1')}{' '}
          <Link
            href={saveData.data}
            download={`${project.name}.json`}
            onClick={cancelSave}
          >
            {t('saveToDisk2')}
          </Link>{' '}
          ({saveData.timestamp}) {t('saveToDisk3')}.
        </Modal>
      )}
    </Container>
  );
};
