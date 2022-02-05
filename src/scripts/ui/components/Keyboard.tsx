import React, { useEffect } from 'react';

import { Audio } from 'modules/audio';
import { createMaster } from 'modules/project/master';
import { createInstrument } from 'modules/audio/instrument';

interface KeyboardMapping {
    readonly [key: string]: number;
}

const keyboardMapping: KeyboardMapping = {
    a: 72, w: 73, s: 74, e: 75, d: 76, f: 77, t: 78, g: 79, z: 80, h: 81, u: 82, j: 83, k: 84,
};

const instrument = createInstrument({
    algorithm: 4,
    operators: [
        {},
        { ratio: 4 },
        { level: 0 },
        { level: 0 },
    ],
});

const master = createMaster({
    volume: 0.1,
});

const onKeyDown = (e: KeyboardEvent): void => {
    const { key } = e;

    if (e.repeat || !Object.prototype.hasOwnProperty.call(keyboardMapping, key)) {
        return;
    }
    e.preventDefault();

    const note = keyboardMapping[key];
    Audio.noteOn(note, 127, instrument, master);
};

const onKeyUp = (e: KeyboardEvent): void => {
    const { key } = e;

    if (e.repeat || !Object.prototype.hasOwnProperty.call(keyboardMapping, key)) {
        return;
    }
    e.preventDefault();

    const note = keyboardMapping[key];
    Audio.noteOff(note);
};

export const Keyboard: React.FC = () => {
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        };
    });

    return null;
};
