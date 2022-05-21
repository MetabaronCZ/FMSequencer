import React from 'react';
import styled from 'styled-components';

import { OperatorData } from 'modules/project/instrument/operator';

import { toVU } from 'ui/typography';
import { OperatorUI } from 'ui/components/instrument/OperatorUI';

const Container = styled.ul`
    list-style-type: none;
`;

const Item = styled.li`
    padding: ${toVU(1)};

    &:nth-child(2n - 1) {
        background: ${({ theme }) => theme.color.grey1};
    }
`;

interface Props {
    readonly track: number;
    readonly data: OperatorData[];
}

export const OperatorList: React.FC<Props> = ({ track, data }) => (
    <Container>
        {data.map((operator, i) => (
            <Item key={i}>
                <OperatorUI
                    track={track}
                    operator={i}
                    data={operator}
                />
            </Item>
        ))}
    </Container>
);
