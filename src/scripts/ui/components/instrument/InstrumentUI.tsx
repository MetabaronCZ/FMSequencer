import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { instrumentSlice } from 'store/instruments';
import { useAppDispatch, useAppSelector } from 'store';

import { paths } from 'modules/paths';
import { toVU } from 'modules/typography';
import { PAN_MAX, PAN_MIN } from 'modules/audio/instrument/pan';
import { LEVEL_MAX, LEVEL_MIN } from 'modules/audio/instrument/level';
import { ALGORITHM_MAX, ALGORITHM_MIN } from 'modules/audio/instrument/algorithm';

import { Slider } from 'ui/common/Slider';
import { Heading } from 'ui/common/Heading';
import { Section } from 'ui/common/Section';
import { FilterUI } from 'ui/components/instrument/FilterUI';
import { OperatorUI } from 'ui/components/instrument/OperatorUI';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';
import { AlgorithmCanvas } from 'ui/components/instrument/AlgorithmCanvas';

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

const OperatorList = styled.ul`
    list-style-type: none;
    margin-top: ${toVU(2)};
`;

const OperatorItem = styled.li`
    padding: ${toVU(1)};

    &:nth-child(2n - 1) {
        background: ${({ theme }) => theme.color.greyLightest};
    }
`;

interface Props {
    readonly instrumentId: number;
}

export const InstrumentUI: React.FC<Props> = ({ instrumentId }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const instruments = useAppSelector((state) => state.instruments);
    const { algorithm, level, pan, filter, operators } = instruments[instrumentId];
    const { setAlgorithm, setLevel, setPan } = instrumentSlice.actions;

    const instOptions = createSelectOptions(instruments, (inst, i) => ({
        label: inst.name,
        value: `${i}`,
    }));

    return (
        <Section>
            <Heading tag="h2" size="default">
                {t('instrument')}
                {' '}
                <SelectRaw
                    value={`${instrumentId}`}
                    options={instOptions}
                    onChange={(value) => {
                        navigate(paths.INSTRUMENT(value));
                    }}
                />
            </Heading>

            <Container>
                <Visual>
                    <AlgorithmCanvas algorithm={algorithm} />
                </Visual>

                <Data>
                    <div>
                        <Slider
                            label={`${t('algorithm')}: ${algorithm}`}
                            value={algorithm}
                            min={ALGORITHM_MIN}
                            max={ALGORITHM_MAX}
                            onChange={(value) => dispatch(
                                setAlgorithm({ id: instrumentId, data: value })
                            )}
                        />

                        <Slider
                            label={`${t('level')}: ${level}`}
                            value={level}
                            min={LEVEL_MIN}
                            max={LEVEL_MAX}
                            onChange={(value) => dispatch(
                                setLevel({ id: instrumentId, data: value })
                            )}
                        />

                        <Slider
                            label={`${t('pan')}: ${pan}`}
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

            <OperatorList>
                {operators.map((operator, i) => (
                    <OperatorItem key={i}>
                        <OperatorUI
                            operatorId={i}
                            instrumentId={instrumentId}
                            data={operator}
                        />
                    </OperatorItem>
                ))}
            </OperatorList>
        </Section>
    );
};
