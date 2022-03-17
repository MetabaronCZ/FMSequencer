export const createRange = (min: number, max: number): number[] => {
    return Array(max - min + 1).fill(0).map((item, i) => min + i);
};

export const createArray = (size: number): number[] => {
    return createRange(0, size - 1);
};

export const fillArray = <T,>(size: number, cb: (i : number) => T): T[] => {
    return createArray(size).map((i) => cb(i));
};
