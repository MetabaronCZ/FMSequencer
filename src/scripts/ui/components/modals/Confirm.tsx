import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'ui/common/Button';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { Modal } from 'ui/common/Modal';

interface Props {
  readonly text: string;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
}

export const Confirm: React.FC<Props> = ({ text, onClose, onConfirm }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('confirmDialog')} onClose={onClose}>
      <Grid>
        <GridRow>
          <GridColumn>{text}</GridColumn>

          <GridColumn $size={0}>
            <Button
              text={t('confirm')}
              onClick={() => {
                onClose();
                onConfirm();
              }}
            />
          </GridColumn>
        </GridRow>
      </Grid>
    </Modal>
  );
};
