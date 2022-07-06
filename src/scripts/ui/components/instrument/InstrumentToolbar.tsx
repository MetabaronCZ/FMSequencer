import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getSaveFileUrl, loadFile, releaseSaveFileUrl } from 'core/file';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { InstrumentData } from 'modules/project/instrument';

import { Button } from 'ui/common/Button';
import { Toolbar, ToolbarItem } from 'ui/common/Toolbar';
import { SaveData, SaveModal } from 'ui/components/modals/SaveModal';
import { confirm } from 'ui/dialog';

interface Props {
  readonly instrument: InstrumentData;
}

export const InstrumentToolbar: React.FC<Props> = ({ instrument }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { track } = useAppSelector((state) => state.session);
  const [saveData, setSaveData] = useState<SaveData | null>(null);
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

  const load = confirm(t('confirmInstrumentChange'), () => {
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
  });

  const save = (): void => {
    setSaveData({
      data: getSaveFileUrl(instrument),
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  const reset = confirm(t('confirmInstrumentReset'), () => {
    dispatch(
      resetInstrument({
        track,
        data: null,
      })
    );
  });

  return (
    <Toolbar>
      <ToolbarItem>{instrument.name}</ToolbarItem>

      <ToolbarItem isActions>
        <Button text={t('load')} onClick={load} />
        <Button text={t('save')} onClick={save} />
        <Button text={t('reset')} onClick={reset} />
      </ToolbarItem>

      {!!saveData && (
        <SaveModal
          filename={`${instrument.name}.json`}
          data={saveData}
          onClose={cancelSave}
        />
      )}
    </Toolbar>
  );
};
