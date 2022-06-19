import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch } from 'store';
import { sessionSlice } from 'store/session';

import { SEQUENCE_LENGTH_MIN } from 'modules/project/config';

import { Button } from 'ui/common/Button';
import { Field } from 'ui/common/Field';
import { Selector } from 'ui/common/Selector';
import { PatternBarsModal } from 'ui/components/modals/PatternBarsModal';
import { getSelection } from 'ui/event';

let barsFieldCounter = 0;

interface Props {
  readonly track: number;
  readonly pattern: number;
  readonly bars: number;
  readonly page: number;
}

export const PatternPaging: React.FC<Props> = ({
  track,
  pattern,
  bars,
  page,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showBarsModal, setBarsModal] = useState(false);
  const { setPatternPage } = sessionSlice.actions;

  const id = `paging-selector-${barsFieldCounter++}`;
  const pages = createRange(SEQUENCE_LENGTH_MIN, bars);

  const pageValues = getSelection(pages, (page) => ({
    label: `${toFixedLength(page, 2, '0')}`,
    value: page,
  }));

  return (
    <>
      <Field id={id} label={t('bars')}>
        <Selector
          value={page}
          values={pageValues}
          onChange={(value) => {
            dispatch(
              setPatternPage({
                bars,
                page: value,
              })
            );
          }}
        />

        {'/'}

        <Button
          text={`${toFixedLength(bars, 2, '0')}`}
          onClick={() => setBarsModal(true)}
        />
      </Field>

      {showBarsModal && (
        <PatternBarsModal
          track={track}
          pattern={pattern}
          bars={bars}
          onClose={() => setBarsModal(false)}
        />
      )}
    </>
  );
};
