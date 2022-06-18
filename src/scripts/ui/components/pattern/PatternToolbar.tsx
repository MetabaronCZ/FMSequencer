import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';

import { PatternDivisionID } from 'modules/project/config';
import { PatternData } from 'modules/project/pattern';

import { Button } from 'ui/common/Button';
import { Toolbar } from 'ui/common/Toolbar';
import { BarSelector } from 'ui/components/selector/BarSelector';
import { PatternSelector } from 'ui/components/selector/PatternSelector';
import { SignatureSelector } from 'ui/components/selector/SignatureSelector';
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

  const { setPattern } = sessionSlice.actions;
  const {
    setTrackPatternBeats,
    setTrackPatternDivision,
    setTrackPatternBars,
    clearTrackPattern,
  } = projectSlice.actions;

  const data = patterns[pattern];

  const setBars = (bars: number): void => {
    dispatch(
      setTrackPatternBars({
        track,
        pattern,
        data: bars,
      })
    );
  };

  const setSignature = (beats: number, division: PatternDivisionID): void => {
    dispatch(
      setTrackPatternBeats({
        track,
        pattern,
        data: beats,
      })
    );

    dispatch(
      setTrackPatternDivision({
        track,
        pattern,
        data: division,
      })
    );
  };

  const clear = confirm(t('confirmPatternDelete'), () =>
    dispatch(
      clearTrackPattern({
        track,
        data: pattern,
      })
    )
  );

  return (
    <Toolbar>
      <PatternSelector
        value={pattern}
        onChange={(value) => dispatch(setPattern(value))}
      />

      <SignatureSelector
        beats={data.beats}
        division={data.division}
        onChange={setSignature}
      />

      <BarSelector value={data.bars} onChange={setBars} />

      {'|'}

      <Button text={t('clear')} onClick={clear} />
    </Toolbar>
  );
};
