import React, { useEffect } from 'react';

import { useAppSelector } from 'ui/store';

import { Audio } from 'modules/audio';
import { Master } from 'modules/project/master';
import { Instrument } from 'modules/audio/instrument';

interface KeyboardMapping {
    readonly [key: string]: number;
}

const keyboardMapping: KeyboardMapping = {
    a: 72, w: 73, s: 74, e: 75, d: 76, f: 77, t: 78, g: 79, z: 80, h: 81, u: 82, j: 83, k: 84,
};

const onKeyDownFn = (instrument: Instrument, master: Master) => (e: KeyboardEvent): void => {
    const { key } = e;

    if (e.repeat || !Object.prototype.hasOwnProperty.call(keyboardMapping, key)) {
        return;
    }
    e.preventDefault();

    const note = keyboardMapping[key];
    Audio.noteOn(note, 127, instrument, master);
};

const onKeyUpFn = () => (e: KeyboardEvent): void => {
    const { key } = e;

    if (e.repeat || !Object.prototype.hasOwnProperty.call(keyboardMapping, key)) {
        return;
    }
    e.preventDefault();

    const note = keyboardMapping[key];
    Audio.noteOff(note);
};

export const Keyboard: React.FC = () => {
    const master = useAppSelector((state) => state.master);
    const instrument = useAppSelector((state) => state.instrument);

    const onKeyDown = onKeyDownFn(instrument, master);
    const onKeyUp = onKeyUpFn();

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        };
    }, [onKeyDown, onKeyUp]);

    return null;
};
