import React from 'react';
import { useNavigate, useParams } from 'react-router';

import { useAppSelector } from 'store';

import { paths } from 'ui/paths';
import { Page } from 'ui/layout/Page';
import { Heading } from 'ui/common/Heading';
import { Keyboard } from 'ui/components/Keyboard';
import { InstrumentUI } from 'ui/components/instrument/InstrumentUI';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';

export const InstrumentView: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const tracks = useAppSelector((state) => state.project.tracks);

    const track = id ? parseInt(id, 10) : 0;
    const { instrument } = tracks[track];

    const instOptions = createSelectOptions(tracks, (track, i) => ({
        label: track.name,
        value: `${i}`,
    }));

    return (
        <Page>
            <Heading tag="h2" size="default">
                <SelectRaw
                    value={`${track}`}
                    options={instOptions}
                    onChange={(value) => {
                        navigate(paths.INSTRUMENT(value));
                    }}
                />
                {' '}
                ({instrument.name})
            </Heading>

            <InstrumentUI
                track={track}
                instrument={instrument}
            />
            <Keyboard track={track} />
        </Page>
    );
};
