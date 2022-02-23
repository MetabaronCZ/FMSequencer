import React from 'react';
import styled, { css } from 'styled-components';

import { Text } from 'ui/common/Text';
import { toVU } from 'ui/typography';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'default' | 'small' | 'large' | 'larger';

const HeadingBase = css`
    ${Text.Default};
    font-weight: normal;
    text-transform: uppercase;

    &:first-child {
        margin-top: 0;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

const HeadingDefault = styled.div`
    ${HeadingBase};
    ${Text.Large};
    margin: ${toVU(2)} 0 ${toVU(1)};
`;

const HeadingSmall = styled.div`
    ${HeadingBase};
    ${Text.Default};
    font-weight: bold;
    margin: ${toVU(2)} 0 ${toVU(1)};
`;

const HeadingLarge = styled.div`
    ${HeadingBase};
    ${Text.Larger};
    margin: ${toVU(3)} 0 ${toVU(2)};
`;

const HeadingLarger = styled.div`
    ${HeadingBase};
    ${Text.Largest};
    margin: ${toVU(4)} 0 ${toVU(3)};
`;

interface Props {
    readonly tag: HeadingTag;
    readonly size?: HeadingSize;
}

export const Heading: React.FC<Props> = ({ tag, size = 'default', children }) => {
    const props = {
        tag,
        children,
        as: tag,
    };
    switch (size) {
        case 'small': return <HeadingSmall {...props} />;
        case 'large': return <HeadingLarge {...props} />;
        case 'larger': return <HeadingLarger {...props} />;
        default: return <HeadingDefault {...props} />;
    }
};
