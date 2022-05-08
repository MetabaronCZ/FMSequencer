import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { projectSlice } from 'store/project';
import { sessionSlice } from 'store/session';
import { useAppDispatch, useAppSelector } from 'store';

import { SequenceData } from 'modules/project/sequence';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { SequenceButton } from 'ui/components/sequence/SequenceButton';
import { PatternSelector } from 'ui/components/selector/PatternSelector';

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
    readonly id: number;
    readonly data: SequenceData;
}

export const SequenceUI: React.FC<Props> = ({ id, data }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { trackMute, trackSolo } = sessionSlice.actions;
    const { setSequenceTrackPattern } = projectSlice.actions;
    const { tracks } = useAppSelector((state) => state.project);
    const { mutedTracks, soloedTrack } = useAppSelector((state) => state.session);
    return (
        <Container>
            {data.tracks.map((track, i) => (
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

                    {' > '}

                    <PatternSelector
                        value={track.pattern}
                        onChange={(p) => dispatch(
                            setSequenceTrackPattern({
                                sequence: id,
                                track: i,
                                pattern: p,
                            })
                        )}
                    />

                    {' '}

                    {`(${tracks[i].patterns[track.pattern].bars})`}
                </Item>
            ))}
        </Container>
    );
};
