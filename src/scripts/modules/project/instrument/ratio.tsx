import { RatioID } from 'modules/engine/config';

export const getRatioValue = (value: RatioID): number => {
  if ('*' === value[0]) {
    return parseInt(value.slice(1), 10);
  } else if ('/' === value[0]) {
    return 1 / parseInt(value.slice(1), 10);
  } else {
    throw new Error(`Could not get RatioID value: Invalid ratio "${value}"!`);
  }
};
