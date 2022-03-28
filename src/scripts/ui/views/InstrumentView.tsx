import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { paths } from 'ui/paths';
import { confirm } from 'ui/dialog';
import { Text } from 'ui/common/Text';
import { Page } from 'ui/layout/Page';
import { Toolkit } from 'ui/common/Toolkit';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { Keyboard } from 'ui/components/Keyboard';
import { getSelectorValues, Selector } from 'ui/common/Selector';
import { InstrumentUI } from 'ui/components/instrument/InstrumentUI';

const InstrumentName = styled.span`
    ${Text.Default};
`;

export const InstrumentView: React.FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { resetInstrument } = projectSlice.actions;
    const tracks = useAppSelector((state) => state.project.tracks);

    const track = id ? parseInt(id, 10) : 0;
    const { instrument } = tracks[track];

    const trackValues = getSelectorValues(tracks, (track, i) => ({
        label: track.name,
        value: i,
    }));

    const reset = confirm(t('confirmInstrumentReset'), () => dispatch(
        resetInstrument({
            track,
            data: null,
        })
    ));

    return (
        <Page>
            <Toolkit>
                <Selector
                    value={track}
                    values={trackValues}
                    onChange={(value) => {
                        navigate(paths.INSTRUMENT(`${value}`));
                    }}
                />

                <InstrumentName>
                    ({instrument.name})
                </InstrumentName>

                {'|'}

                <ButtonRaw
                    text={t('reset')}
                    onClick={reset}
                />
            </Toolkit>

            <InstrumentUI
                track={track}
                instrument={instrument}
            />

            <Keyboard track={track} />
        </Page>
    );
};
