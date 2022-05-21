import styled from 'styled-components';

import { toVU } from 'ui/typography';

export const Content = styled.div`
    flex: 1;
    max-width: ${({ theme }) => theme.dimensions.page.width};
    padding: 0 ${toVU(2)};
    margin: 0 auto;
`;
