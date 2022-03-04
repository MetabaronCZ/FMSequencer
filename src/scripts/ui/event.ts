import { MouseEvent } from 'react';

type Changeable = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type OnClick = () => void;
export type OnChange<T extends string> = (value: T) => void;

export const clickOnly = <T extends HTMLElement>(cb: OnClick) => (e: MouseEvent<T>) => {
    e.preventDefault();
    cb();
};

export const change = <T extends string, U extends Changeable>(cb: OnChange<T>) => (e: React.ChangeEvent<U>) => {
    const value = e.currentTarget.value as T;
    e.preventDefault();
    cb(value);
};
