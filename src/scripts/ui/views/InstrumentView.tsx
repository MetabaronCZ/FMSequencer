import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { paths } from 'ui/paths';
import { confirm } from 'ui/dialog';
import { Page } from 'ui/layout/Page';
import { Toolbar } from 'ui/common/Toolbar';
import { ButtonRaw } from 'ui/common/ButtonRaw';
import { Keyboard } from 'ui/components/Keyboard';
import { InstrumentUI } from 'ui/components/instrument/InstrumentUI';
import { TrackSelector } from 'ui/components/selector/TrackSelector';

export const InstrumentView: React.FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { resetInstrument } = projectSlice.actions;
    const tracks = useAppSelector((state) => state.project.tracks);

    const track = id ? parseInt(id, 10) : 0;
    const { instrument } = tracks[track];

    const reset = confirm(t('confirmInstrumentReset'), () => dispatch(
        resetInstrument({
            track,
            data: null,
        })
    ));

    return (
        <Page>
            <Toolbar>
                <TrackSelector
                    value={track}
                    onChange={(value) => {
                        navigate(paths.INSTRUMENT(`${value}`));
                    }}
                />

                ({instrument.name})

                {' | '}

                <ButtonRaw
                    text={t('reset')}
                    onClick={reset}
                />
            </Toolbar>

            <InstrumentUI
                track={track}
                instrument={instrument}
            />

            <Keyboard track={track} />
        </Page>
    );
};
