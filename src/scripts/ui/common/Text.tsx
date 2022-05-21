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

const TextSmall = css`
    ${TextBase};
    font-size: ${({ theme }) => theme.fontSize.small};
    line-height: ${({ theme }) => theme.lineHeight.small};
`;

export const Text = {
    Default: TextDefault,
    Small: TextSmall,
};
