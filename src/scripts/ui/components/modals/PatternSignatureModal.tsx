import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { SignatureID } from 'modules/project/config';

import { Button } from 'ui/common/Button';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { Modal } from 'ui/common/Modal';
import { SignatureSelector } from 'ui/components/selector/SignatureSelector';
import { confirm } from 'ui/dialog';

interface Props {
  readonly track: number;
  readonly pattern: number;
  readonly signature: SignatureID;
  readonly onClose: () => void;
}

export const PatternSignatureModal: React.FC<Props> = ({
  track,
  pattern,
  signature,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<SignatureID>(signature);
  const { setTrackPatternSignature } = projectSlice.actions;

  const setSignature = confirm(t('confirmPatternSizeChange'), () => {
    dispatch(
      setTrackPatternSignature({
        track,
        pattern,
        data: value,
      })
    );
    onClose();
  });

  return (
    <Modal title={t('patternSignatureModal')} onClose={onClose}>
      <Grid>
        <GridRow>
          <GridColumn>
            <SignatureSelector value={value} onChange={setValue} />
          </GridColumn>

          <GridColumn $size={0}>
            <Button text={t('confirm')} onClick={setSignature} />
          </GridColumn>
        </GridRow>
      </Grid>
    </Modal>
  );
};
