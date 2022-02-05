import styled from 'styled-components';
import { Text } from 'ui/common/Text';

export const Paragraph = styled.p`
    ${Text.Default};
    margin-bottom: ${({ theme }) => theme.lineHeight.default};

    &:last-child {
        margin-bottom: 0;
    }
`;
