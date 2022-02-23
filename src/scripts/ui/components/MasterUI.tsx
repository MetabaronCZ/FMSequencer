import React from 'react';
import { useTranslation } from 'react-i18next';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { LEVEL_MAX, LEVEL_MIN } from 'modules/engine/config';

import { Slider } from 'ui/common/Slider';
import { Section } from 'ui/common/Section';

export const MasterUI: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const master = useAppSelector((state) => state.project.master);
    const { setMasterLevel } = projectSlice.actions;
    return (
        <Section>
            <Slider
                label={`${t('level')}: ${master.level}`}
                value={master.level}
                min={LEVEL_MIN}
                max={LEVEL_MAX}
                onChange={(value) => dispatch(
                    setMasterLevel(value)
                )}
            />
        </Section>
    );
};
