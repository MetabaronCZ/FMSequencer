import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toFixedLength } from 'core/format';
import { limitNumber } from 'core/number';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';

import { SEQUENCE_LENGTH_MIN } from 'modules/project/config';
import { PatternData } from 'modules/project/pattern';

import { Button } from 'ui/common/Button';
import { Field } from 'ui/common/Field';
import { IcoButton } from 'ui/common/IcoButton';
import { Text } from 'ui/common/Text';
import { Toolbar, ToolbarItem } from 'ui/common/Toolbar';
import { Confirm } from 'ui/components/modals/Confirm';
import { PatternBarsModal } from 'ui/components/modals/PatternBarsModal';
import { PatternSignatureModal } from 'ui/components/modals/PatternSignatureModal';
import { PatternSelector } from 'ui/components/selector/PatternSelector';
import { toVU } from 'ui/typography';

const CurrentBar = styled.div`
  ${Text.Default};
  padding: 0 ${toVU(0.5)};
`;

interface Props {
  readonly track: number;
  readonly pattern: number;
  readonly patterns: PatternData[];
}

export const PatternToolbar: React.FC<Props> = ({
  track,
  pattern,
  patterns,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { patternPage } = useAppSelector((state) => state.session);

  const [showBarsModal, setBarsModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showSignatureModal, setSignatureModal] = useState(false);

  const { clearTrackPattern } = projectSlice.actions;
  const { setPattern, setPatternPage, resetPatternPage } = sessionSlice.actions;

  const { signature, bars } = patterns[pattern];

  const gotoPage = (diff: number): void => {
    const page = limitNumber(patternPage + diff, 0, bars);
    dispatch(setPatternPage({ page, bars }));
  };

  return (
    <>
      <Toolbar>
        <ToolbarItem>
          <PatternSelector
            value={pattern}
            onChange={(value) => dispatch(setPattern(value))}
          />

          <Field id="signature-button">
            <Button
              text={signature}
              title={t('signature')}
              onClick={() => setSignatureModal(true)}
            />
          </Field>

          <Field id="bars-button" label={t('bars')}>
            <Button
              text={`${toFixedLength(bars, 2, '0')}`}
              onClick={() => setBarsModal(true)}
            />
          </Field>
        </ToolbarItem>

        <ToolbarItem isActions>
          <IcoButton
            ico="arrowLeft"
            title={t('prev')}
            disabled={patternPage <= SEQUENCE_LENGTH_MIN}
            onClick={() => gotoPage(-1)}
          />

          <CurrentBar>{toFixedLength(patternPage, 2, '0')}</CurrentBar>

          <IcoButton
            ico="arrowRight"
            title={t('next')}
            disabled={patternPage >= bars}
            onClick={() => gotoPage(+1)}
          />

          <IcoButton
            ico="cross"
            title={t('clear')}
            onClick={() => setShowClearModal(true)}
          />
        </ToolbarItem>
      </Toolbar>

      {showSignatureModal && (
        <PatternSignatureModal
          track={track}
          pattern={pattern}
          signature={signature}
          onClose={() => setSignatureModal(false)}
        />
      )}

      {showBarsModal && (
        <PatternBarsModal
          track={track}
          pattern={pattern}
          bars={bars}
          onClose={() => setBarsModal(false)}
        />
      )}

      {showClearModal && (
        <Confirm
          text={t('confirmSongClear')}
          onClose={() => setShowClearModal(false)}
          onConfirm={() => {
            dispatch(clearTrackPattern({ track, data: pattern }));
            dispatch(resetPatternPage());
          }}
        />
      )}
    </>
  );
};
