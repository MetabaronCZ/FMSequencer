import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'store';
import { projectSlice } from 'store/project';

import { InstrumentData } from 'modules/project/instrument';
import {
    AlgorithmID, ALGORITHM_MAX, ALGORITHM_MIN,
    LEVEL_MAX, LEVEL_MIN, PAN_MAX, PAN_MIN,
} from 'modules/engine/config';

import { toVU } from 'ui/typography';
import { Slider } from 'ui/common/Slider';
import { Heading } from 'ui/common/Heading';
import { Section } from 'ui/common/Section';
import { FilterUI } from 'ui/components/instrument/FilterUI';
import { OperatorUI } from 'ui/components/instrument/OperatorUI';
import { AnalyserCanvas } from 'ui/components/instrument/AnalyserCanvas';
import { AlgorithmCanvas } from 'ui/components/instrument/AlgorithmCanvas';
import { DataGrid, DataGridColumn, DataGridRow } from 'ui/common/DataGrid';

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
    readonly track: number;
    readonly instrument: InstrumentData;
}

export const InstrumentUI: React.FC<Props> = ({ track, instrument }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { algorithm, level, pan, filter, operators } = instrument;
    const { setInstrumentAlgorithm, setInstrumentLevel, setInstrumentPan } = projectSlice.actions;
    return (
        <Section>
            <DataGrid>
                <DataGridColumn>
                    <AlgorithmCanvas algorithm={algorithm} />
                </DataGridColumn>

                <DataGridColumn>
                    <DataGridRow>
                        <Slider
                            label={`${t('algorithm')}: ${algorithm}`}
                            value={algorithm}
                            min={ALGORITHM_MIN}
                            max={ALGORITHM_MAX}
                            onChange={(value) => dispatch(
                                setInstrumentAlgorithm({
                                    track,
                                    data: value as AlgorithmID,
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
                                setInstrumentLevel({ track, data: value })
                            )}
                        />
                    </DataGridRow>

                    <DataGridRow>
                        <Slider
                            label={`${t('pan')}: ${pan}`}
                            value={pan}
                            min={PAN_MIN}
                            max={PAN_MAX}
                            onChange={(value) => dispatch(
                                setInstrumentPan({ track, data: value })
                            )}
                        />
                    </DataGridRow>
                </DataGridColumn>

                <DataGridColumn isVertical>
                    <Heading tag="h3" size="small">
                        {t('filter')}
                    </Heading>
                </DataGridColumn>

                <FilterUI
                    track={track}
                    data={filter}
                />

                <DataGridColumn>
                    <AnalyserCanvas track={track} />
                </DataGridColumn>
            </DataGrid>

            <OperatorList>
                {operators.map((operator, i) => (
                    <OperatorItem key={i}>
                        <OperatorUI
                            track={track}
                            operator={i}
                            data={operator}
                        />
                    </OperatorItem>
                ))}
            </OperatorList>
        </Section>
    );
};
