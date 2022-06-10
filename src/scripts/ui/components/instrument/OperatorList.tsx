import React from 'react';
import styled from 'styled-components';

import { OperatorData } from 'modules/project/instrument/operator';

import { toVU } from 'ui/typography';
import { OperatorUI } from 'ui/components/instrument/OperatorUI';

interface StyledProps {
    $highlighted: boolean;
}

const Container = styled.ul`
    list-style-type: none;
`;

const Item = styled.li<StyledProps>`
    padding: ${toVU(1)};
    background: ${({ theme, $highlighted }) => $highlighted ? theme.color.grey1 : ''};
`;

interface Props {
    readonly track: number;
    readonly data: OperatorData[];
}

export const OperatorList: React.FC<Props> = ({ track, data }) => (
    <Container>
        {data.map((operator, i) => {
            const isHighlighted = (0 === i % 2);
            return (
                <Item $highlighted={isHighlighted} key={i}>
                    <OperatorUI
                        track={track}
                        operator={i}
                        data={operator}
                        highlighted={isHighlighted}
                    />
                </Item>
            );
        })}
    </Container>
);
