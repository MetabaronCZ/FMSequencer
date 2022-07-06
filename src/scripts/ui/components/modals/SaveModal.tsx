import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'ui/common/Link';
import { Modal } from 'ui/common/Modal';

export interface SaveData {
  readonly data: string;
  readonly timestamp: string;
}

interface Props {
  readonly filename: string;
  readonly data: SaveData;
  readonly onClose: () => void;
}

export const SaveModal: React.FC<Props> = ({ filename, data, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('saveModalTitle')} onClose={onClose}>
      {t('saveToDisk1')}{' '}
      <Link href={data.data} download={filename} onClick={onClose}>
        {t('saveToDisk2')}
      </Link>{' '}
      ({data.timestamp}) {t('saveToDisk3')}.
    </Modal>
  );
};
