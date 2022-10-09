import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getSaveFileUrl, loadFile, releaseSaveFileUrl } from 'core/file';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { InstrumentData } from 'modules/project/instrument';

import { IcoButton } from 'ui/common/IcoButton';
import { Toolbar, ToolbarItem } from 'ui/common/Toolbar';
import { Confirm } from 'ui/components/modals/Confirm';
import { SaveData, SaveModal } from 'ui/components/modals/SaveModal';

interface Props {
  readonly instrument: InstrumentData;
}

export const InstrumentToolbar: React.FC<Props> = ({ instrument }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [saveData, setSaveData] = useState<SaveData | null>(null);

  const { track } = useAppSelector((state) => state.session);
  const { loadInstrument, resetInstrument } = projectSlice.actions;

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
  }, [instrument]);

  return (
    <>
      <Toolbar>
        <ToolbarItem>{instrument.name}</ToolbarItem>

        <ToolbarItem isActions>
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
                data: getSaveFileUrl(instrument),
                timestamp: new Date().toLocaleTimeString(),
              });
            }}
          />

          <IcoButton
            ico="reload"
            title={t('reset')}
            onClick={() => setShowResetModal(true)}
          />
        </ToolbarItem>

        {!!saveData && (
          <SaveModal
            filename={`${instrument.name}.json`}
            data={saveData}
            onClose={cancelSave}
          />
        )}
      </Toolbar>

      {showLoadModal && (
        <Confirm
          text={t('confirmInstrumentChange')}
          onClose={() => setShowLoadModal(false)}
          onConfirm={() => {
            loadFile()
              .then((data) => {
                return dispatch(
                  loadInstrument({
                    track,
                    data,
                  })
                );
              })
              .catch(() => alert(t('alertInvalidFileSelected')));
          }}
        />
      )}

      {showResetModal && (
        <Confirm
          text={t('confirmInstrumentReset')}
          onClose={() => setShowResetModal(false)}
          onConfirm={() => dispatch(resetInstrument({ track, data: null }))}
        />
      )}
    </>
  );
};
