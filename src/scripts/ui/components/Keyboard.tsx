import React, { useEffect } from 'react';

import { useAppSelector } from 'store';

import { AudioEngine } from 'modules/engine';
import { InstrumentData } from 'modules/audio/instrument';
import { VELOCITY_MAX } from 'modules/audio/instrument/velocity';

interface KeyboardMapping {
    readonly [key: string]: number;
}

const keyboardMapping: KeyboardMapping = {
    a: 72, w: 73, s: 74, e: 75, d: 76, f: 77, t: 78, g: 79, z: 80, h: 81, u: 82, j: 83, k: 84,
};

const onKeyDownFn = (instrument: InstrumentData) => (e: KeyboardEvent): void => {
    const { key } = e;

    if (e.repeat || !Object.prototype.hasOwnProperty.call(keyboardMapping, key)) {
        return;
    }
    e.preventDefault();

    const note = keyboardMapping[key];
    const time = AudioEngine.getTime();
    AudioEngine.previewVoice.noteOn(note, VELOCITY_MAX, instrument, time);
};

const onKeyUpFn = () => (e: KeyboardEvent): void => {
    const { key } = e;

    if (e.repeat || !Object.prototype.hasOwnProperty.call(keyboardMapping, key)) {
        return;
    }
    e.preventDefault();

    const time = AudioEngine.getTime();
    AudioEngine.previewVoice.noteOff(time);
};

interface Props {
    readonly instrumentId: number;
}

export const Keyboard: React.FC<Props> = ({ instrumentId }) => {
    const instrument = useAppSelector((state) => state.instruments[instrumentId]);

    const onKeyDown = onKeyDownFn(instrument);
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
