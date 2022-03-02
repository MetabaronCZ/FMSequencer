import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useAppSelector } from 'store';

import { PatternData } from 'modules/project/pattern';
import { SequenceData } from 'modules/project/sequence';
import { SequencePatternData } from 'modules/project/sequence-pattern';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';
import { SequenceButton } from 'ui/components/sequence/SequenceButton';

const getTrackTimeline = (seqPatterns: SequencePatternData[], patterns: PatternData[], bars: number): number[] => {
    const timeline = Array(bars).fill(null);
    const data = [...seqPatterns].sort((a, b) => a.bar - b.bar);

    data.forEach(({ bar, pattern }, i) => {
        const next = data[i + 1] ? data[i + 1].bar : bars;
        const length = patterns[pattern].bars;
        const last = Math.min(next - 1, bar + length - 1);

        for (let j = bar; j <= last; j++) {
            timeline[j] = pattern;
        }
    });

    return timeline;
};

const List = styled.ul`
    list-style-type: none;
`;

const ListItem = styled.li`
    ${Text.Default};
    margin-bottom: ${toVU(1)};

    &:last-child {
        margin-bottom: 0;
    }
`;

const Timeline = styled.pre`
    display: inline-block;
`;

interface Props {
    readonly sequence: SequenceData;
}

export const SequenceUI: React.FC<Props> = ({ sequence }) => {
    const { t } = useTranslation();
    const [muted, setMuted] = useState<number[]>([]);
    const [soloed, setSoloed] = useState<number | null>(null);
    const tracks = useAppSelector((state) => state.project.tracks);

    const mute = (id: number): void => {
        if (muted.includes(id)) {
            setMuted(muted.filter((mut) => id !== mut));
        } else {
            setMuted([...muted, id]);
        }
    };

    const solo = (id: number): void => {
        if (id === soloed) {
            setSoloed(null);
        } else {
            setSoloed(id);
        }
    };

    return (
        <List>
            {sequence.tracks.map((track, i) => {
                const timeline = getTrackTimeline(track.patterns, tracks[i].patterns, sequence.bars)
                    .map((ptn, t) => {
                        if (null === ptn) {
                            return '[---]';
                        }
                        return 0 === t ? `[${('000' + ptn).slice(-3)}]` : '[>>>]';
                    });

                return (
                    <ListItem key={i}>
                        <SequenceButton
                            text="M"
                            title={t('mute')}
                            isActive={muted.includes(i)}
                            onClick={() => mute(i)}
                        />
                        {' '}
                        <SequenceButton
                            text="S"
                            title={t('solo')}
                            isActive={i === soloed}
                            onClick={() => solo(i)}
                        />
                        {' '}
                        {t('track')} {i + 1}
                        {' | '}
                        <Timeline>{timeline.join('')}</Timeline>
                    </ListItem>
                );
            })}
        </List>
    );
};
