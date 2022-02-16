import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { instrumentSlice } from 'store/instruments';

import { Slider } from 'ui/common/Slider';
import { createSelectOptions, Select } from 'ui/common/Select';
import { FREQUENCY_MAX, FREQUENCY_MIN } from 'modules/audio/instrument/frequency';
import { FilterData, RESONANCE_MIN, RESONANCE_MAX, filterTypes, FilterTypeID } from 'modules/audio/instrument/filter';

const filterTypeValues = filterTypes.slice(0) as FilterTypeID[];

const options = createSelectOptions(filterTypeValues, (item) => ({
    label: item,
    value: item,
}));

interface Props {
    readonly instrumentId: number;
    readonly data: FilterData;
}

export const FilterUI: React.FC<Props> = ({ instrumentId, data }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { type, cutoff, resonance } = data;
    const { setFilterType, setFilterCutoff, setFilterResonance } = instrumentSlice.actions;
    return (
        <div>
            <Select
                label={t('filterType')}
                value={type}
                options={options}
                onChange={(value) => dispatch(
                    setFilterType({ id: instrumentId, data: value })
                )}
            />

            <Slider
                label={`${t('filterCutoff')}: ${cutoff}`}
                value={cutoff}
                min={FREQUENCY_MIN}
                max={FREQUENCY_MAX}
                onChange={(value) => dispatch(
                    setFilterCutoff({ id: instrumentId, data: value })
                )}
            />

            <Slider
                label={`${t('filterResonance')}: ${resonance}`}
                value={resonance}
                min={RESONANCE_MIN}
                max={RESONANCE_MAX}
                step={RESONANCE_MIN}
                onChange={(value) => dispatch(
                    setFilterResonance({ id: instrumentId, data: value })
                )}
            />
        </div>
    );
};
