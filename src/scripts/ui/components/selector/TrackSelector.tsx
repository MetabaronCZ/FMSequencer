import React from 'react';
import { useTranslation } from 'react-i18next';

import { createArray } from 'core/array';
import { TRACK_COUNT } from 'modules/engine/config';

import { getSelection } from 'ui/event';
import { SelectorField } from 'ui/common/SelectorField';

const trackIds = createArray(TRACK_COUNT);

const values = getSelection(trackIds, (id) => ({
    label: `${id + 1}`,
    value: id,
}));

interface Props {
    readonly value: number;
    readonly onChange: (value: number) => void;
}

export const TrackSelector: React.FC<Props> = ({ value, onChange }) => {
    const { t } = useTranslation();
    return (
        <SelectorField
            label={t('track')}
            value={value}
            values={values}
            onChange={onChange}
        />
    );
};
