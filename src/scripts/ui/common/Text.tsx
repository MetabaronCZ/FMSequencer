import { css } from 'styled-components';

const TextBase = css`
    font-family: ${({ theme }) => theme.font.default};
    color: ${({ theme }) => theme.color.black};
`;

const TextDefault = css`
    ${TextBase};
    font-size: ${({ theme }) => theme.fontSize.default};
    line-height: ${({ theme }) => theme.lineHeight.default};
`;

export const Text = {
    Default: TextDefault,
};
