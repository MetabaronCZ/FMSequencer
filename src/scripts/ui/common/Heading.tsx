import React from 'react';
import styled from 'styled-components';

import { Text } from 'ui/common/Text';
import { toVU } from 'ui/typography';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const StyledHeading = styled.div`
    ${Text.Default};
    font-weight: normal;
    text-transform: uppercase;
    margin: ${toVU(2)} 0 ${toVU(1)};

    &:first-child {
        margin-top: 0;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

interface Props {
    readonly tag: HeadingTag;
}

export const Heading: React.FC<Props> = ({ tag, children }) => (
    <StyledHeading as={tag}>
        {children}
    </StyledHeading>
);
