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
import { Heading } from 'ui/common/Heading';
import { createSelectOptions, Select } from 'ui/common/Select';
import { EnvelopeUI } from 'ui/components/instrument/EnvelopeUI';
import { EnvelopeCanvas } from 'ui/components/instrument/EnvelopeCanvas';

const oscTypeValues = oscillatorTypes.slice(0) as OscillatorTypeID[];

const options = createSelectOptions(oscTypeValues, (item) => ({
    label: item,
    value: item,
}));

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const Row = styled.div`
    margin-bottom: ${toVU(1)};

    &: last-child {
        margin-bottom: 0;
    }

    & > * {
        width: 100%;
    }
`;

interface StyledProps {
    readonly $isVertical?: boolean;
}

const Column = styled.div<StyledProps>`
    flex: 0 0 auto;
    margin-left: ${toVU(1)};

    &: last-child {
        flex: 1;
        margin-right: 0;
    }

    ${({ theme, $isVertical }) => !!$isVertical && `
        writing-mode: vertical-lr;
        transform: rotate(180deg);
        text-align: right;
        margin-left: ${toVU(2)};
        border-right: ${theme.border.grey};

        &:first-child {
            margin-left: 0;
            border-right: none;
        }
    `};
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
        <Container>
            <Column $isVertical>
                <Heading tag="h3" size="small">
                    {`${t('operator')} ${operatorId + 1}`}
                </Heading>
            </Column>

            <Column>
                <Row>
                    <Select
                        label={t('shape')}
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
                </Row>

                <Row>
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
                </Row>

                <Row>
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
            </Column>

            <Column $isVertical>
                <Heading tag="h3" size="small">
                    {t('envelope')}
                </Heading>
            </Column>

            <Column>
                <EnvelopeUI
                    instrumentId={instrumentId}
                    operatorId={operatorId}
                    data={envelope}
                />
            </Column>

            <Column>
                <EnvelopeCanvas
                    envelope={envelope}
                />
            </Column>
        </Container>
    );
};
