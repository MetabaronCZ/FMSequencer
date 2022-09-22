import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';

import { Button } from 'ui/common/Button';
import { Toolbar, ToolbarItem } from 'ui/common/Toolbar';
import { SequenceLengthSelector } from 'ui/components/selector/SequenceLengthSelector';
import { SequenceSelector } from 'ui/components/selector/SequenceSelector';
import { confirm } from 'ui/dialog';

interface Props {
  readonly bars: number;
}

export const SequenceToolbar: React.FC<Props> = ({ bars }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { setSequence } = sessionSlice.actions;
  const { setSequenceLength, clearSequence } = projectSlice.actions;

  const { sequences } = useAppSelector((state) => state.project);
  const { sequence, track } = useAppSelector((state) => state.session);

  const clear = confirm(t('confirmSequenceDelete'), () =>
    dispatch(clearSequence(sequence))
  );

  return (
    <Toolbar>
      <ToolbarItem>
        <SequenceSelector
          value={sequence}
          onChange={(value) => {
            dispatch(
              setSequence({
                value,
                pattern: sequences[value].tracks[track].pattern,
              })
            );
          }}
        />

        <SequenceLengthSelector
          bars={bars}
          onChange={(value) => {
            dispatch(
              setSequenceLength({
                sequence,
                data: value,
              })
            );
          }}
        />
      </ToolbarItem>

      <ToolbarItem isActions>
        <Button text="×" title={t('clear')} onClick={clear} />
      </ToolbarItem>
    </Toolbar>
  );
};
