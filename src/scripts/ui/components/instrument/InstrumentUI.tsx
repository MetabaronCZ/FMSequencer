import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { instrumentSlice } from 'store/instrument';
import { useAppDispatch, useAppSelector } from 'store';

import { toVU } from 'modules/typography';
import { PAN_MAX, PAN_MIN } from 'modules/audio/instrument/pan';
import { LEVEL_MAX, LEVEL_MIN } from 'modules/audio/instrument/level';
import { ALGORITHM_MAX, ALGORITHM_MIN } from 'modules/audio/instrument/algorithm';

import { Slider } from 'ui/common/Slider';
import { Heading } from 'ui/common/Heading';
import { Section } from 'ui/common/Section';
import { FilterUI } from 'ui/components/instrument/FilterUI';
import { OperatorUI } from 'ui/components/instrument/OperatorUI';
import { AlgorithmUI } from 'ui/components/instrument/AlgorithmUI';

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const Visual = styled.div`
    margin-right: ${toVU(2)};
`;

const Data = styled.div`
    flex: 1;
`;

const OperatorItem = styled.div`
    padding: ${toVU(1)};

    &:nth-child(2n) {
        background: ${({ theme }) => theme.color.greyLightest};
    }
`;

interface Props {
    readonly instrumentId: number;
}

export const InstrumentUI: React.FC<Props> = ({ instrumentId }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const instrument = useAppSelector((state) => state.instruments[instrumentId]);
    const { name, algorithm, level, pan, filter, operators } = instrument;
    const { setAlgorithm, setLevel, setPan } = instrumentSlice.actions;
    return (
        <Section>
            <Heading tag="h2" size="default">
                {t('instrument')}: {name}
            </Heading>

            <Container>
                <Visual>
                    <AlgorithmUI algorithm={algorithm} />
                </Visual>

                <Data>
                    <div>
                        <Slider
                            label={t('algorithm')}
                            value={algorithm}
                            min={ALGORITHM_MIN}
                            max={ALGORITHM_MAX}
                            onChange={(value) => dispatch(
                                setAlgorithm({ id: instrumentId, data: value })
                            )}
                        />

                        <Slider
                            label={t('level')}
                            value={level}
                            min={LEVEL_MIN}
                            max={LEVEL_MAX}
                            onChange={(value) => dispatch(
                                setLevel({ id: instrumentId, data: value })
                            )}
                        />

                        <Slider
                            label={t('pan')}
                            value={pan}
                            min={PAN_MIN}
                            max={PAN_MAX}
                            onChange={(value) => dispatch(
                                setPan({ id: instrumentId, data: value })
                            )}
                        />
                    </div>

                    <Heading tag="h3" size="small">
                        {t('filter')}
                    </Heading>

                    <FilterUI
                        instrumentId={instrumentId}
                        data={filter}
                    />
                </Data>
            </Container>

            <Heading tag="h3" size="small">
                {t('operators')}
            </Heading>

            {operators.map((operator, i) => (
                <OperatorItem key={i}>
                    <OperatorUI
                        operatorId={i}
                        instrumentId={instrumentId}
                        data={operator}
                    />
                </OperatorItem>
            ))}
        </Section>
    );
};
