import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getSaveFileUrl, loadFile, releaseSaveFileUrl } from 'core/file';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { IcoButton } from 'ui/common/IcoButton';
import { Confirm } from 'ui/components/modals/Confirm';
import { SaveData, SaveModal } from 'ui/components/modals/SaveModal';
import { toVU } from 'ui/typography';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: ${toVU(1)};
`;

export const Actions: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state);
  const { createProject, loadProject } = projectSlice.actions;

  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [saveData, setSaveData] = useState<SaveData | null>(null);

  const cancelSave = (): void => setSaveData(null);

  // free URL blob data memory when data changes
  useEffect(() => {
    return () => {
      if (saveData) {
        releaseSaveFileUrl(saveData.data);
      }
    };
  }, [saveData]);

  // reset save data on project data update
  useEffect(() => {
    cancelSave();
  }, [project]);

  return (
    <Container>
      <div>
        <IcoButton
          ico="plus"
          title={t('create')}
          onClick={() => setShowCreateModal(true)}
        />

        <IcoButton
          ico="download"
          title={t('load')}
          onClick={() => setShowLoadModal(true)}
        />

        <IcoButton
          ico="save"
          title={t('save')}
          onClick={() => {
            setSaveData({
              data: getSaveFileUrl(project),
              timestamp: new Date().toLocaleTimeString(),
            });
          }}
        />
      </div>

      {showCreateModal && (
        <Confirm
          text={t('confirmProjectChange')}
          onClose={() => setShowCreateModal(false)}
          onConfirm={() => dispatch(createProject())}
        />
      )}

      {showLoadModal && (
        <Confirm
          text={t('confirmProjectChange')}
          onClose={() => setShowLoadModal(false)}
          onConfirm={() => {
            loadFile()
              .then((data) => dispatch(loadProject(data)))
              .catch(() => alert(t('alertInvalidFileSelected')));
          }}
        />
      )}

      {!!saveData && (
        <SaveModal
          filename={`${project.name}.json`}
          data={saveData}
          onClose={cancelSave}
        />
      )}
    </Container>
  );
};
