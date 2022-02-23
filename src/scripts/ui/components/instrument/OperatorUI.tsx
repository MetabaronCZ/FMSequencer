import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import {
    OscillatorTypeID, oscillatorTypes, ratios,
    LEVEL_MAX, LEVEL_MIN,
} from 'modules/engine/config';
import { OperatorData } from 'modules/project/instrument/operator';

import { Slider } from 'ui/common/Slider';
import { Heading } from 'ui/common/Heading';
import { createSelectOptions, Select } from 'ui/common/Select';
import { EnvelopeUI } from 'ui/components/instrument/EnvelopeUI';
import { EnvelopeCanvas } from 'ui/components/instrument/EnvelopeCanvas';
import { DataGrid, DataGridColumn, DataGridRow } from 'ui/common/DataGrid';

const oscTypeValues = oscillatorTypes.slice(0) as OscillatorTypeID[];

const options = createSelectOptions(oscTypeValues, (item) => ({
    label: item,
    value: item,
}));

interface Props {
    readonly track: number;
    readonly operator: number;
    readonly data: OperatorData;
}

export const OperatorUI: React.FC<Props> = ({ track, operator, data }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { level, ratio, type, envelope } = data;
    const {
        setInstrumentOperatorType,
        setInstrumentOperatorLevel, setInstrumentOperatorRatio,
    } = projectSlice.actions;

    const minRatioIndex = 0;
    const maxRatioIndex = ratios.length - 1;
    return (
        <DataGrid>
            <DataGridColumn isVertical>
                <Heading tag="h3" size="small">
                    {`${t('operator')} ${operator + 1}`}
                </Heading>
            </DataGridColumn>

            <DataGridColumn>
                <DataGridRow>
                    <Select
                        label={t('shape')}
                        value={type}
                        options={options}
                        onChange={(value) => dispatch(
                            setInstrumentOperatorType({
                                track,
                                operator,
                                data: value,
                            })
                        )}
                    />
                </DataGridRow>

                <DataGridRow>
                    <Slider
                        label={`${t('level')}: ${level}`}
                        value={level}
                        min={LEVEL_MIN}
                        max={LEVEL_MAX}
                        onChange={(value) => dispatch(
                            setInstrumentOperatorLevel({
                                track,
                                operator,
                                data: value,
                            })
                        )}
                    />
                </DataGridRow>

                <DataGridRow>
                    <Slider
                        label={`${t('ratio')}: ${ratio}`}
                        value={ratios.indexOf(ratio)}
                        min={minRatioIndex}
                        max={maxRatioIndex}
                        minLabel={ratios[minRatioIndex]}
                        maxLabel={ratios[maxRatioIndex]}
                        onChange={(value) => dispatch(
                            setInstrumentOperatorRatio({
                                track,
                                operator,
                                data: ratios[value],
                            })
                        )}
                    />
                </DataGridRow>
            </DataGridColumn>

            <DataGridColumn isVertical>
                <Heading tag="h3" size="small">
                    {t('envelope')}
                </Heading>
            </DataGridColumn>

            <DataGridColumn>
                <EnvelopeUI
                    track={track}
                    operator={operator}
                    data={envelope}
                />
            </DataGridColumn>

            <DataGridColumn>
                <EnvelopeCanvas envelope={envelope} />
            </DataGridColumn>
        </DataGrid>
    );
};
