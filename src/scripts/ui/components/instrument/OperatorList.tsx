import React from 'react';
import { useTranslation } from 'react-i18next';

import { OperatorData } from 'modules/project/instrument/operator';

import { OperatorTable } from 'ui/components/instrument/OperatorTable';
import { OperatorUI } from 'ui/components/instrument/OperatorUI';

interface Props {
  readonly track: number;
  readonly data: OperatorData[];
}

export const OperatorList: React.FC<Props> = ({ track, data }) => {
  const { t } = useTranslation();
  return (
    <OperatorTable>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>{t('shape')}</th>
          <th>{t('level')}</th>
          <th>{t('ratio')}</th>
          <th>{t('envelopeAttack')}</th>
          <th>{t('envelopeDecay')}</th>
          <th>{t('envelopeSustain')}</th>
          <th>{t('envelopeRelease')}</th>
        </tr>
      </thead>

      <tbody>
        {data.map((operator, i) => (
          <OperatorUI
            operator={operator}
            operatorId={i}
            track={track}
            isInverse={0 === i % 2}
            key={i}
          />
        ))}
      </tbody>
    </OperatorTable>
  );
};
