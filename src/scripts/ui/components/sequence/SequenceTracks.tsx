import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store';
import { sessionSlice } from 'store/session';

import { SequenceTrackData } from 'modules/project/sequence/track';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { SequenceButton } from 'ui/components/sequence/SequenceButton';

const Container = styled.ul`
    list-style-type: none;
`;

const Item = styled.li`
    ${Text.Default};
    display: flex;
    gap: ${toVU(1)};
    flex-direction: row;
    align-items: center;
    padding: ${toVU(0.5)} 0;
    margin-bottom: 1px;

    &:last-child {
        margin-bottom: 0;
    }
`;

interface Props {
    readonly tracks: SequenceTrackData[];
}

export const SequenceTracks: React.FC<Props> = ({ tracks }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { trackMute, trackSolo } = sessionSlice.actions;
    const { mutedTracks, soloedTrack } = useAppSelector((state) => state.session);
    return (
        <Container>
            {tracks.map((track, i) => (
                <Item key={i}>
                    <SequenceButton
                        text="M"
                        title={t('mute')}
                        isActive={mutedTracks.includes(i)}
                        onClick={() => dispatch(trackMute(i))}
                    />

                    <SequenceButton
                        text="S"
                        title={t('solo')}
                        isActive={i === soloedTrack}
                        onClick={() => dispatch(trackSolo(i))}
                    />

                    {track.name}
                </Item>
            ))}
        </Container>
    );
};
