import { RatioID } from 'modules/engine/config';

export const getRatioValue = (value: RatioID): number => {
  const parts = value.split('/').map((part) => parseFloat(part));
  return parts[0] / (parts[1] || 1);
};
