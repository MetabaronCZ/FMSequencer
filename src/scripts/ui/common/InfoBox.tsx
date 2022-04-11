import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

export const InfoBox = styled.div`
    ${Text.Default};
    position: relative;
    padding: ${toVU(1)};
    padding-left: ${toVU(4)};
    margin-bottom: ${toVU(1)};
    background: ${({ theme }) => theme.color.greyLightest};

    &::before {
        position: absolute;
        top: ${toVU(1)};
        left: ${toVU(1)};
        width: ${toVU(2)};
        content: 'i';
        font-weight: bold;
        text-align: center;
        border-radius: 100%;
        color: ${({ theme }) => theme.color.greyLightest};
        background: ${({ theme }) => theme.color.greyDarkest};
    }

    &:last-child {
        margin-bottom: 0;
    }
`;
