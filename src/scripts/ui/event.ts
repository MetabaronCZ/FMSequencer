import { MouseEvent } from 'react';

export type OnClick = () => void;

export const clickOnly = <T extends HTMLElement>(cb: OnClick) => (e: MouseEvent<T>) => {
    e.preventDefault();
    cb();
};
