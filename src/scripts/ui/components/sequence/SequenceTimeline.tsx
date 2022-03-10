import React from 'react';
import styled from 'styled-components';

import { projectSlice } from 'store/project';
import { useAppDispatch, useAppSelector } from 'store';

import { SequenceData } from 'modules/project/sequence';
import { getTrackTimeline } from 'modules/project/sequence/timeline';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { createSelectOptions, SelectRaw } from 'ui/common/SelectRaw';

const deletePtnOption = '-1';

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
    width: ${toVU(4)};
    line-height: ${toVU(4)};
    border-right: ${({ theme }) => theme.border.white};
    color: ${({ $filled, theme }) => $filled ? theme.color.white : ''};
    background: ${({ $filled, theme }) => $filled ? theme.color.black : ''};
    border-top-left-radius: ${({ $first, theme }) => $first ? theme.radius.default : 0};
    border-bottom-left-radius: ${({ $first, theme }) => $first ? theme.radius.default : 0};
    border-top-right-radius: ${({ $last, theme }) => $last ? theme.radius.default : 0};
    border-bottom-right-radius: ${({ $last, theme }) => $last ? theme.radius.default : 0};
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

    const setPattern = (track: number, bar: number, value: string): void => {
        dispatch(
            deletePtnOption === value
                ? removeSequenceTrackPattern({
                    sequence,
                    track,
                    bar,
                })
                : setSequenceTrackPattern({
                    sequence,
                    track,
                    bar,
                    pattern: parseInt(value, 10),
                })
        );
    };

    return (
        <Container>
            {data.tracks.map((track, i) => {
                const timeline = getTrackTimeline(track.patterns, tracks[i].patterns, data.bars);

                let patternOptions = createSelectOptions(tracks[i].patterns, (ptn, p) => ({
                    label: `${p}`,
                    value: `${p}`,
                }));

                patternOptions = [
                    {
                        label: '-',
                        value: deletePtnOption,
                    },
                    ...patternOptions,
                ];

                return (
                    <Track key={i}>
                        {timeline.map(({ pattern, first, last }, j) => (
                            <TimelineItem
                                $filled={null !== pattern}
                                $first={!!first}
                                $last={!!last}
                                key={j}
                            >
                                <SelectRaw
                                    value={first ? `${pattern}` : deletePtnOption}
                                    options={patternOptions}
                                    onChange={(value) => setPattern(i, j, value)}
                                    inverted={null !== pattern}
                                />
                            </TimelineItem>
                        ))}
                    </Track>
                );
            })}
        </Container>
    );
};
