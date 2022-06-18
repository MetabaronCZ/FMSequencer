import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { Button } from 'ui/common/Button';
import { Toolbar, ToolbarItem } from 'ui/common/Toolbar';
import { confirm } from 'ui/dialog';

interface Props {
  readonly name: string;
}

export const InstrumentToolbar: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { track } = useAppSelector((state) => state.session);
  const { resetInstrument } = projectSlice.actions;

  const reset = confirm(t('confirmInstrumentReset'), () =>
    dispatch(
      resetInstrument({
        track,
        data: null,
      })
    )
  );

  return (
    <Toolbar>
      <ToolbarItem>{name}</ToolbarItem>

      <ToolbarItem isActions>
        <Button text={t('reset')} onClick={reset} />
      </ToolbarItem>
    </Toolbar>
  );
};
