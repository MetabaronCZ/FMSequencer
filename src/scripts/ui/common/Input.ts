import { css } from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

export const InputStyles = css`
    ${Text.Default};
    display: block;
    width: 100%;
    height: ${toVU(3)};
    padding: 0 ${toVU(1)};
    border: none;
    outline: none;
    background: ${({ theme }) => theme.color.white};
`;
