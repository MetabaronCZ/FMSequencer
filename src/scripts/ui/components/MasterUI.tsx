import React from 'react';
import { useTranslation } from 'react-i18next';

import { masterSlice } from 'store/master';
import { useAppDispatch, useAppSelector } from 'store';

import { Slider } from 'ui/common/Slider';
import { Heading } from 'ui/common/Heading';
import { Section } from 'ui/common/Section';
import { LEVEL_MAX, LEVEL_MIN } from 'modules/audio/instrument/level';

export const MasterUI: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const master = useAppSelector((state) => state.master);
    const { setLevel } = masterSlice.actions;
    return (
        <Section>
            <Heading tag="h2" size="default">
                {t('master')}
            </Heading>

            <div>
                <Slider
                    label={t('level')}
                    value={master.level}
                    min={LEVEL_MIN}
                    max={LEVEL_MAX}
                    onChange={(value) => dispatch(
                        setLevel(value)
                    )}
                />
            </div>
        </Section>
    );
};
