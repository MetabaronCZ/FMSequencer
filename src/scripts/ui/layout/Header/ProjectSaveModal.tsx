import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'ui/common/Link';
import { Modal } from 'ui/common/Modal';
import { ProjectSaveData } from 'ui/layout/Header';

interface Props {
  readonly filename: string;
  readonly data: ProjectSaveData;
  readonly onClose: () => void;
}

export const ProjectSaveModal: React.FC<Props> = ({
  filename,
  data,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <Modal title={t('projectSaveModal')} onClose={onClose}>
      {t('saveToDisk1')}{' '}
      <Link href={data.data} download={filename} onClick={onClose}>
        {t('saveToDisk2')}
      </Link>{' '}
      ({data.timestamp}) {t('saveToDisk3')}.
    </Modal>
  );
};
