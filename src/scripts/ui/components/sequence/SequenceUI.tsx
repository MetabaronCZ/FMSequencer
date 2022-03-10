import React from 'react';
import styled from 'styled-components';

import { SequenceData } from 'modules/project/sequence';

import { SequenceTracks } from 'ui/components/sequence/SequenceTracks';
import { SequenceTimeline } from 'ui/components/sequence/SequenceTimeline';

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

interface Props {
    readonly sequence: number;
    readonly data: SequenceData;
}

export const SequenceUI: React.FC<Props> = ({ sequence, data }) => (
    <Container>
        <SequenceTracks tracks={data.tracks} />
        <SequenceTimeline sequence={sequence} data={data} />
    </Container>
);
