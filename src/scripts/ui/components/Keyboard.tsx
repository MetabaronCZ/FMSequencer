import React, { useEffect } from 'react';

import { useAppSelector } from 'store';

import { AudioEngine } from 'modules/engine';
import { VELOCITY_MAX } from 'modules/engine/config';
import { keyboardMapping } from 'modules/project/keyboard';
import { InstrumentData } from 'modules/project/instrument';

const onKeyDownFn = (instrument: InstrumentData, track: number) => (e: KeyboardEvent): void => {
    const { key } = e;

    if (e.repeat || !Object.prototype.hasOwnProperty.call(keyboardMapping, key)) {
        return;
    }
    e.preventDefault();

    const note = keyboardMapping[key];
    const time = AudioEngine.getTime();
    AudioEngine.voices[track].noteOn(note, VELOCITY_MAX, instrument, time);
};

const onKeyUpFn = (track: number) => (e: KeyboardEvent): void => {
    const { key } = e;

    if (e.repeat || !Object.prototype.hasOwnProperty.call(keyboardMapping, key)) {
        return;
    }
    e.preventDefault();

    const time = AudioEngine.getTime();
    AudioEngine.voices[track].noteOff(time);
};

interface Props {
    readonly track: number;
}

export const Keyboard: React.FC<Props> = ({ track }) => {
    const { instrument } = useAppSelector((state) => state.project.tracks[track]);
    const onKeyDown = onKeyDownFn(instrument, track);
    const onKeyUp = onKeyUpFn(track);

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
