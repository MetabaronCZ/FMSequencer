import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { useAppDispatch, useAppSelector } from 'store';
import { projectSlice } from 'store/project';

import { LEVEL_MAX, LEVEL_MIN } from 'modules/engine/config';
import { TEMPO_MAX, TEMPO_MIN } from 'modules/project/config';

import { SelectorField } from 'ui/common/SelectorField';
import { TextField } from 'ui/common/TextField';
import { getSelection } from 'ui/event';
import { toVU } from 'ui/typography';

const tempos = createRange(TEMPO_MIN, TEMPO_MAX);
const levels = createRange(LEVEL_MIN, LEVEL_MAX);

const tempoValues = getSelection(tempos, (val) => ({
  label: toFixedLength(val, 3),
  value: val,
}));

const levelValues = getSelection(levels, (val) => ({
  label: toFixedLength(val, 2),
  value: val,
}));

export interface ProjectSaveData {
  readonly data: string;
  readonly timestamp: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(2)};
`;

export const Fields: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setName, setTempo, setMasterLevel } = projectSlice.actions;

  const { project } = useAppSelector((state) => state);
  const { name, tempo, master } = project;

  return (
    <Container>
      <TextField
        label={t('name')}
        value={name}
        onChange={(value) => dispatch(setName(value))}
        borderless
        inverseLabel
      />

      <SelectorField
        label={t('bpm')}
        value={tempo}
        values={tempoValues}
        onChange={(value) => dispatch(setTempo(value))}
        borderless
        inverseLabel
      />

      <SelectorField
        label={t('master')}
        value={master.level}
        values={levelValues}
        onChange={(value) => dispatch(setMasterLevel(value))}
        borderless
        inverseLabel
      />
    </Container>
  );
};
