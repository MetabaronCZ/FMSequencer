export const limitNumber = (nr: number, min: number, max: number): number => {
  if (min > max) {
    throw new Error(
      'Could not limit number: minimum value is grrater than maximum!'
    );
  }
  nr = Math.max(nr, min);
  nr = Math.min(nr, max);
  return nr;
};

export const getSign = (nr: number): 1 | -1 => {
  return nr >= 0 ? +1 : -1;
};
