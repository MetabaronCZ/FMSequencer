const arr1 = Array(126).fill(0).map((val, i) => `1/${i + 2}`).reverse();
const arr2 = Array(32).fill(0).map((val, i) => `${i + 1}`);

export const ratios = [...arr1.concat(arr2)] as const;
export type RatioID = typeof ratios[number];

export const getRatioValue = (value: RatioID): number => {
    const parts = value.split('/').map((part) => parseFloat(part));
    return parts[0] / (parts[1] || 1);
};
