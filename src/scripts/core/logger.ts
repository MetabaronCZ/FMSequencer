/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export const Logger = {
  log: (...args: any[]): void => {
    console.log(...args);
  },
  error: (...args: any[]): void => {
    console.error(...args);
  },
};
