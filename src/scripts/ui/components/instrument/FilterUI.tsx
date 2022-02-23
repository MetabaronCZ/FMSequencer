import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import {
    filterTypes, FilterTypeID,
    FREQUENCY_MAX, FREQUENCY_MIN, RESONANCE_MIN, RESONANCE_MAX,
} from 'modules/engine/config';
import { FilterData } from 'modules/project/instrument/filter';

import { Slider } from 'ui/common/Slider';
import { createSelectOptions, Select } from 'ui/common/Select';

const filterTypeValues = filterTypes.slice(0) as FilterTypeID[];

const options = createSelectOptions(filterTypeValues, (item) => ({
    label: item,
    value: item,
}));

interface Props {
    readonly track: number;
    readonly data: FilterData;
}

export const FilterUI: React.FC<Props> = ({ track, data }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { type, cutoff, resonance } = data;
    const {
        setInstrumentFilterType, setInstrumentFilterCutoff,
        setInstrumentFilterResonance,
    } = projectSlice.actions;
    return (
        <div>
            <Select
                label={t('filterType')}
                value={type}
                options={options}
                onChange={(value) => dispatch(
                    setInstrumentFilterType({ track, data: value })
                )}
            />

            <Slider
                label={`${t('filterCutoff')}: ${cutoff}`}
                value={cutoff}
                min={FREQUENCY_MIN}
                max={FREQUENCY_MAX}
                onChange={(value) => dispatch(
                    setInstrumentFilterCutoff({ track, data: value })
                )}
            />

            <Slider
                label={`${t('filterResonance')}: ${resonance}`}
                value={resonance}
                min={RESONANCE_MIN}
                max={RESONANCE_MAX}
                step={RESONANCE_MIN}
                onChange={(value) => dispatch(
                    setInstrumentFilterResonance({ track, data: value })
                )}
            />
        </div>
    );
};
