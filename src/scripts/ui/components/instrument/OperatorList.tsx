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

  const headings: string[] = [
    '',
    '',
    t('shape'),
    t('level'),
    t('ratio'),
    t('envelopeAttack'),
    t('envelopeDecay'),
    t('envelopeSustain'),
    t('envelopeRelease'),
  ];

  return (
    <OperatorTable>
      <thead>
        <tr>
          {headings.map((heading, h) => (
            <th key={h}>{heading}</th>
          ))}
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
