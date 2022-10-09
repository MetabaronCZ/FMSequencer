import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';

import { IcoButton } from 'ui/common/IcoButton';
import { Toolbar, ToolbarItem } from 'ui/common/Toolbar';
import { Confirm } from 'ui/components/modals/Confirm';
import { SequenceLengthSelector } from 'ui/components/selector/SequenceLengthSelector';
import { SequenceSelector } from 'ui/components/selector/SequenceSelector';

interface Props {
  readonly bars: number;
}

export const SequenceToolbar: React.FC<Props> = ({ bars }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const { setSequence } = sessionSlice.actions;
  const { setSequenceLength, clearSequence } = projectSlice.actions;

  const { sequences } = useAppSelector((state) => state.project);
  const { sequence, track } = useAppSelector((state) => state.session);

  return (
    <>
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
          <IcoButton
            ico="cross"
            title={t('clear')}
            onClick={() => setShowModal(true)}
          />
        </ToolbarItem>
      </Toolbar>

      {showModal && (
        <Confirm
          text={t('confirmSequenceDelete')}
          onClose={() => setShowModal(false)}
          onConfirm={() => dispatch(clearSequence(sequence))}
        />
      )}
    </>
  );
};
