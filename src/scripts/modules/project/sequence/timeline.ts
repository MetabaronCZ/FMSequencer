import { PatternData } from 'modules/project/pattern';
import { SequencePatternData } from 'modules/project/sequence/pattern';

interface TimelineBar {
    readonly id: number;
    readonly pattern: number;
}

interface TimelineItem {
    readonly pattern: number | null;
    readonly first?: boolean;
    readonly last?: boolean;
    readonly filled?: boolean;
}

const getTimelineBars = (seqPatterns: SequencePatternData[], patterns: PatternData[], bars: number): TimelineBar[] => {
    const timeline = Array(bars).fill(null);
    const data = [...seqPatterns].sort((a, b) => a.bar - b.bar);

    // fill timeline with pattern IDs
    data.forEach(({ bar, pattern }, i) => {
        const nextBar = data[i + 1] ? data[i + 1].bar : bars;
        const length = patterns[pattern].bars;
        const last = Math.min(nextBar - 1, bar + length - 1);

        for (let j = bar; j <= last; j++) {
            timeline[j] = {
                id: i,
                pattern,
            };
        }
    });

    return timeline;
};

export const getTrackTimeline = (seqPatterns: SequencePatternData[], patterns: PatternData[], bars: number): TimelineItem[] => {
    const timeline = getTimelineBars(seqPatterns, patterns, bars);
    let currentPattern = -1;

    const items: TimelineItem[] = timeline.map((ptn, p) => {
        if (null === ptn) {
            currentPattern = -1;
            return { pattern: null };
        }
        const { id, pattern } = ptn;
        const next = timeline[p + 1];
        const isFirst = currentPattern !== id;
        const isLast = (!next || id !== next.id);
        currentPattern = id;

        return {
            pattern,
            last: isLast,
            first: isFirst,
        };
    });

    return items;
};
