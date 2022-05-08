import styled from 'styled-components';

import { toVU } from 'ui/typography';
import { Text } from 'ui/common/Text';

export const Toolbar = styled.div`
    ${Text.Default};
    display: flex;
    gap: ${toVU(1)};
    margin-bottom: ${toVU(1)};
`;
