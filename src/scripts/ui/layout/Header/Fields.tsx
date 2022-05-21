import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { createRange } from 'core/array';
import { toFixedLength } from 'core/format';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { LEVEL_MAX, LEVEL_MIN } from 'modules/engine/config';
import { TEMPO_MAX, TEMPO_MIN } from 'modules/project/config';

import { toVU } from 'ui/typography';
import { getSelection } from 'ui/event';
import { TextField } from 'ui/common/TextField';
import { SelectorField } from 'ui/common/SelectorField';

const tempos = createRange(TEMPO_MIN, TEMPO_MAX);
const levels = createRange(LEVEL_MIN, LEVEL_MAX);

const tempoValues = getSelection(tempos, (val) => ({
    label: toFixedLength(val, 3),
    value: val,
}));

const levelValues = getSelection(levels, (val) => ({
    label: toFixedLength(val, 3),
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
    margin-left: ${toVU(4)};
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
                inverse
            />

            <SelectorField
                label={t('bpm')}
                value={tempo}
                values={tempoValues}
                onChange={(value) => dispatch(setTempo(value))}
                inverse
            />

            <SelectorField
                label={t('level')}
                value={master.level}
                values={levelValues}
                onChange={(value) => dispatch(
                    setMasterLevel(value)
                )}
                inverse
            />
        </Container>
    );
};