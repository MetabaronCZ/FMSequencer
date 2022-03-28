import React from 'react';
import styled from 'styled-components';

import { createArray } from 'core/array';
import { toFixedLength } from 'core/format';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { PATTERN_COUNT } from 'modules/project/config';
import { SequenceData } from 'modules/project/sequence';
import { getTrackTimeline } from 'modules/project/sequence/timeline';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { getSelection } from 'ui/event';
import { Selector } from 'ui/common/Selector';

const paternIds = createArray(PATTERN_COUNT);

const patternValues = getSelection(paternIds, (p) => ({
    label: toFixedLength(p, 3),
    value: p,
}));

const Container = styled.ul`
    list-style-type: none;
    margin-left: ${toVU(2)};
`;

const Track = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1px;

    &:last-child {
        margin-bottom: 0;
    }
`;

interface StyledProps {
    readonly $filled: boolean;
    readonly $first: boolean;
    readonly $last: boolean;
}

const TimelineItem = styled.div<StyledProps>`
    ${Text.Default};
    flex: 1;
    padding: ${toVU(0.5)};
    border-right: ${({ theme }) => theme.border.white};
    color: ${({ $filled, theme }) => $filled ? theme.color.white : ''};
    background: ${({ $filled, theme }) => $filled ? theme.color.black : ''};
    border-right-color: ${({ $last, $filled, theme }) => $filled && !$last ? theme.color.black : theme.color.white};
    text-align: center;

    &:last-child {
        border-right: none;
    }
`;

interface Props {
    readonly sequence: number;
    readonly data: SequenceData;
}

export const SequenceTimeline: React.FC<Props> = ({ sequence, data }) => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector((state) => state.project.tracks);
    const { setSequenceTrackPattern, removeSequenceTrackPattern } = projectSlice.actions;
    return (
        <Container>
            {data.tracks.map((track, i) => {
                const timeline = getTrackTimeline(track.patterns, tracks[i].patterns, data.bars);
                return (
                    <Track key={i}>
                        {timeline.map(({ pattern, first, last }, j) => (
                            <TimelineItem
                                $filled={null !== pattern}
                                $first={!!first}
                                $last={!!last}
                                key={j}
                            >
                                <Selector
                                    value={first ? pattern : null}
                                    values={patternValues}
                                    placeholder="&nbsp;&mdash;&nbsp;"
                                    plain
                                    inverted={null !== pattern}
                                    onChange={(value) => dispatch(
                                        setSequenceTrackPattern({
                                            sequence,
                                            track: i,
                                            bar: j,
                                            pattern: value,
                                        })
                                    )}
                                    onDelete={() => dispatch(
                                        removeSequenceTrackPattern({
                                            sequence,
                                            track: i,
                                            bar: j,
                                        })
                                    )}
                                />
                            </TimelineItem>
                        ))}
                    </Track>
                );
            })}
        </Container>
    );
};
