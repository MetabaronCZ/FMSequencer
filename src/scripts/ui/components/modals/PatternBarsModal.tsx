import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';

import { Button } from 'ui/common/Button';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { Modal } from 'ui/common/Modal';
import { BarSelector } from 'ui/components/selector/BarSelector';
import { confirm } from 'ui/dialog';

interface State {
  readonly bars: number;
}

interface Props {
  readonly track: number;
  readonly pattern: number;
  readonly bars: number;
  readonly onClose: () => void;
}

export const PatternBarsModal: React.FC<Props> = ({
  track,
  pattern,
  bars,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<State>({ bars });

  const { setPatternPage } = sessionSlice.actions;
  const { setTrackPatternBars } = projectSlice.actions;
  const { patternPage } = useAppSelector((state) => state.session);

  const setBars = confirm(t('confirmPatternSizeChange'), () => {
    dispatch(
      setTrackPatternBars({
        track,
        pattern,
        data: state.bars,
      })
    );
    if (bars < patternPage) {
      dispatch(
        setPatternPage({
          bars,
          page: bars,
        })
      );
    }
    onClose();
  });

  return (
    <Modal title={t('patternBarsModal')} onClose={onClose}>
      <Grid>
        <GridRow>
          <GridColumn>
            <BarSelector
              value={state.bars}
              onChange={(bars) => setState({ bars })}
            />
          </GridColumn>

          <GridColumn $size={0}>
            <Button text={t('confirm')} onClick={setBars} />
          </GridColumn>
        </GridRow>
      </Grid>
    </Modal>
  );
};
