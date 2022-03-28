import { css } from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

export const InputStyles = css`
    ${Text.Default};
    height: ${({ theme }) => theme.lineHeight.default};
    padding: 0 ${toVU(0.5)};
    border: none;
    outline: none;
    border-bottom: ${({ theme }) => theme.border.grey};
    background-color: ${({ theme }) => theme.color.greyLightest};

    &:focus {
        border-color: ${({ theme }) => theme.color.black};
    }
`;
