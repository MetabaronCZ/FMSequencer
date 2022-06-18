import { MouseEvent } from 'react';

type Changeable = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type OnClick = () => void;
export type OnChange<T extends string> = (value: T) => void;

export const clickOnly = <T extends HTMLElement>(cb: OnClick) => {
  return (e: MouseEvent<T>) => {
    e.preventDefault();
    cb();
  };
};

export const change = <T extends string, U extends Changeable>(
  cb: OnChange<T>
) => {
  return (e: React.ChangeEvent<U>) => {
    const value = e.currentTarget.value as T;
    e.preventDefault();
    cb(value);
  };
};

export interface SelectionValue<T extends string | number> {
  readonly label: string;
  readonly value: T;
}
type SelectionCallback<T extends string | number, U> = (
  item: U,
  i: number
) => SelectionValue<T>;

export const getSelection = <T extends string | number, U>(
  items: U[],
  cb: SelectionCallback<T, U>
): SelectionValue<T>[] => {
  return items.map(cb);
};
