import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { PatternDivisionID } from 'modules/project/config';
import { PatternData } from 'modules/project/pattern';

import { Button } from 'ui/common/Button';
import { Grid, GridColumn, GridRow } from 'ui/common/Grid';
import { Modal } from 'ui/common/Modal';
import { SignatureSelector } from 'ui/components/selector/SignatureSelector';
import { confirm } from 'ui/dialog';

interface State {
  readonly beats: number;
  readonly division: PatternDivisionID;
}

interface Props {
  readonly track: number;
  readonly pattern: number;
  readonly data: PatternData;
  readonly onClose: () => void;
}

export const PatternSignatureModal: React.FC<Props> = ({
  track,
  pattern,
  data,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [state, setState] = useState<State>({
    beats: data.beats,
    division: data.division,
  });

  const { setTrackPatternBeats, setTrackPatternDivision } =
    projectSlice.actions;

  const setSignature = confirm(t('confirmPatternSizeChange'), () => {
    dispatch(
      setTrackPatternBeats({
        track,
        pattern,
        data: state.beats,
      })
    );

    dispatch(
      setTrackPatternDivision({
        track,
        pattern,
        data: state.division,
      })
    );

    onClose();
  });

  return (
    <Modal title={t('patternSignatureModal')} onClose={onClose}>
      <Grid>
        <GridRow>
          <GridColumn>
            <SignatureSelector
              beats={state.beats}
              division={state.division}
              onChange={(beats, division) => setState({ beats, division })}
            />
          </GridColumn>

          <GridColumn $size={0}>
            <Button text={t('confirm')} onClick={setSignature} />
          </GridColumn>
        </GridRow>
      </Grid>
    </Modal>
  );
};
