export const ratios = [
    1 / 128, 1 / 64, 1 / 32,
    1 / 16, 1 / 15, 1 / 14, 1 / 13, 1 / 12, 1 / 11, 1 / 10, 1 / 9,
    1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 32, 64, 128,
] as const;

export type RatioID = typeof ratios[number];
export const RATIO_MIN = ratios[0];
export const RATIO_MAX = ratios[ratios.length - 1];
