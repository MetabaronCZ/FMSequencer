import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { toFixedLength } from 'core/format';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';

import { PatternData } from 'modules/project/pattern';

import { Button } from 'ui/common/Button';
import { Field } from 'ui/common/Field';
import { Toolbar, ToolbarItem } from 'ui/common/Toolbar';
import { PatternSignatureModal } from 'ui/components/modals/PatternSignatureModal';
import { PatternPaging } from 'ui/components/pattern/PatternPaging';
import { PatternSelector } from 'ui/components/selector/PatternSelector';
import { confirm } from 'ui/dialog';

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
  const [showSignatureModal, setSignatureModal] = useState(false);

  const { clearTrackPattern } = projectSlice.actions;
  const { setPattern, resetPatternPage } = sessionSlice.actions;

  const data = patterns[pattern];

  const clear = confirm(t('confirmPatternDelete'), () => {
    dispatch(
      clearTrackPattern({
        track,
        data: pattern,
      })
    );
    dispatch(resetPatternPage());
  });

  const formattedBeats = toFixedLength(data.beats, 2, '0');
  const formattedDivision = toFixedLength(data.division, 2, '0');

  return (
    <Toolbar>
      <ToolbarItem>
        <PatternSelector
          value={pattern}
          onChange={(value) => dispatch(setPattern(value))}
        />

        <Field id="signature-button" label={t('signature')}>
          <Button
            text={`${formattedBeats}/${formattedDivision}`}
            onClick={() => setSignatureModal(true)}
          />
        </Field>

        {showSignatureModal && (
          <PatternSignatureModal
            track={track}
            pattern={pattern}
            data={data}
            onClose={() => setSignatureModal(false)}
          />
        )}

        <PatternPaging
          track={track}
          pattern={pattern}
          bars={data.bars}
          page={patternPage}
        />
      </ToolbarItem>

      <ToolbarItem isActions>
        <Button text="×" title={t('clear')} onClick={clear} />
      </ToolbarItem>
    </Toolbar>
  );
};
