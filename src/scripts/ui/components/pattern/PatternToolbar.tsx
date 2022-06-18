import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';

import { PatternDivisionID } from 'modules/project/config';
import { PatternData } from 'modules/project/pattern';

import { Button } from 'ui/common/Button';
import { Toolbar, ToolbarItem } from 'ui/common/Toolbar';
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
  const { patternPage } = useAppSelector((state) => state.session);

  const { setPattern, setPatternPage, resetPatternPage } = sessionSlice.actions;
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
    if (bars < patternPage) {
      setPage(bars, bars);
    }
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

  const clear = confirm(t('confirmPatternDelete'), () => {
    dispatch(
      clearTrackPattern({
        track,
        data: pattern,
      })
    );
    dispatch(resetPatternPage());
  });

  const setPage = (bars: number, page: number): void => {
    dispatch(setPatternPage({ bars, page }));
  };

  return (
    <Toolbar>
      <ToolbarItem>
        <PatternSelector
          value={pattern}
          onChange={(value) => dispatch(setPattern(value))}
        />

        <SignatureSelector
          beats={data.beats}
          division={data.division}
          onChange={setSignature}
        />

        <BarSelector
          bars={data.bars}
          page={patternPage}
          onBarsChange={setBars}
          onPageChange={(page) => setPage(data.bars, page)}
        />
      </ToolbarItem>

      <ToolbarItem isActions>
        <Button text={t('clear')} onClick={clear} />
      </ToolbarItem>
    </Toolbar>
  );
};
