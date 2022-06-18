import React from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import {
  SEQUENCE_LENGTH_MAX,
  SEQUENCE_LENGTH_MIN,
} from 'modules/project/config';

import { Field } from 'ui/common/Field';
import { Selector } from 'ui/common/Selector';
import { getSelection } from 'ui/event';

let barsFieldCounter = 0;

const barIds = createRange(SEQUENCE_LENGTH_MIN, SEQUENCE_LENGTH_MAX);

const barValues = getSelection(barIds, (id) => ({
  label: `${toFixedLength(id, 2, '0')}`,
  value: id,
}));

interface Props {
  readonly bars: number;
  readonly page?: number;
  readonly onBarsChange: (bars: number) => void;
  readonly onPageChange?: (page: number) => void;
}

export const BarSelector: React.FC<Props> = ({
  bars,
  page = null,
  onBarsChange,
  onPageChange,
}) => {
  const { t } = useTranslation();
  const id = `sig-selector-${barsFieldCounter++}`;

  const pages = createRange(SEQUENCE_LENGTH_MIN, bars);

  const pageValues = getSelection(pages, (page) => ({
    label: `${toFixedLength(page, 2, '0')}`,
    value: page,
  }));

  return (
    <Field id={id} label={t('bars')}>
      {null !== page && (
        <>
          <Selector
            value={page}
            values={pageValues}
            onChange={onPageChange ?? (() => null)}
          />
          {'/'}
        </>
      )}
      <Selector value={bars} values={barValues} onChange={onBarsChange} />
    </Field>
  );
};
