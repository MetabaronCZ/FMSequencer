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

const TextSmaller = css`
    ${TextBase};
    font-size: ${({ theme }) => theme.fontSize.smaller};
    line-height: ${({ theme }) => theme.lineHeight.smaller};
`;

const TextSmallest = css`
    ${TextBase};
    font-size: ${({ theme }) => theme.fontSize.smallest};
    line-height: ${({ theme }) => theme.lineHeight.smallest};
`;

const TextLarge = css`
    ${TextBase};
    font-size: ${({ theme }) => theme.fontSize.large};
    line-height: ${({ theme }) => theme.lineHeight.large};
`;

const TextLarger = css`
    ${TextBase};
    font-size: ${({ theme }) => theme.fontSize.larger};
    line-height: ${({ theme }) => theme.lineHeight.larger};
`;

const TextLargest = css`
    ${TextBase};
    font-size: ${({ theme }) => theme.fontSize.largest};
    line-height: ${({ theme }) => theme.lineHeight.largest};
`;

export const Text = {
    Default: TextDefault,
    Small: TextSmall,
    Smaller: TextSmaller,
    Smallest: TextSmallest,
    Large: TextLarge,
    Larger: TextLarger,
    Largest: TextLargest,
};
