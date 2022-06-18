const VU = 10; // vertical unit
export const toVU = (nr: number): string => `${Math.round(nr * VU)}px`;
export const getImagePath = (img: string): string => `/images/${img}`;
