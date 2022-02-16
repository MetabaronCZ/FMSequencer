import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { instrumentSlice } from 'store/instruments';

import { toVU } from 'modules/typography';
import { ratios } from 'modules/audio/instrument/ratio';
import { OperatorData } from 'modules/audio/instrument/operator';
import { LEVEL_MAX, LEVEL_MIN } from 'modules/audio/instrument/level';
import { OscillatorTypeID, oscillatorTypes } from 'modules/audio/instrument/oscillator';

import { Slider } from 'ui/common/Slider';
import { createSelectOptions, Select } from 'ui/common/Select';
import { EnvelopeUI } from 'ui/components/instrument/EnvelopeUI';

const oscTypeValues = oscillatorTypes.slice(0) as OscillatorTypeID[];

const options = createSelectOptions(oscTypeValues, (item) => ({
    label: item,
    value: item,
}));

const Row = styled.div`
    margin-bottom: ${toVU(1)};
`;

interface Props {
    readonly instrumentId: number;
    readonly operatorId: number;
    readonly data: OperatorData;
}

export const OperatorUI: React.FC<Props> = ({ operatorId, instrumentId, data }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { level, ratio, type, envelope } = data;
    const { setOperatorType, setOperatorLevel, setOperatorRatio } = instrumentSlice.actions;
    const minRatioIndex = 0;
    const maxRatioIndex = ratios.length - 1;
    return (
        <div>
            <Row>
                <Select
                    label={`${t('operator')} ${operatorId + 1}`}
                    value={type}
                    options={options}
                    onChange={(value) => dispatch(
                        setOperatorType({
                            operator: operatorId,
                            instrument: instrumentId,
                            data: value,
                        })
                    )}
                />

                <Slider
                    label={`${t('level')}: ${level}`}
                    value={level}
                    min={LEVEL_MIN}
                    max={LEVEL_MAX}
                    onChange={(value) => dispatch(
                        setOperatorLevel({
                            operator: operatorId,
                            instrument: instrumentId,
                            data: value,
                        })
                    )}
                />

                <Slider
                    label={`${t('ratio')}: ${ratio}`}
                    value={ratios.indexOf(ratio)}
                    min={minRatioIndex}
                    max={maxRatioIndex}
                    minLabel={ratios[minRatioIndex]}
                    maxLabel={ratios[maxRatioIndex]}
                    onChange={(value) => dispatch(
                        setOperatorRatio({
                            operator: operatorId,
                            instrument: instrumentId,
                            data: ratios[value],
                        })
                    )}
                />
            </Row>

            <EnvelopeUI
                instrumentId={instrumentId}
                operatorId={operatorId}
                data={envelope}
            />
        </div>
    );
};
