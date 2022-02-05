import { BASE_FREQUENCY, MIDI_MAX, SAMPLE_RATE } from 'modules/audio/config';

import { Master } from 'modules/project/master';
import { Instrument } from 'modules/audio/instrument';
import { Operator } from 'modules/audio/instrument/operator';
import { Envelope } from 'modules/audio/instrument/envelope';
import { algorithmConfig } from 'modules/audio/instrument/algorithm';

// const minMIDIValue = 0;
const forcedReleaseTime = 0.01;

interface OperatorNodes {
    readonly oscNode: OscillatorNode;
    readonly gainNode: GainNode;
    readonly envelope: Envelope;
    readonly ratio: number;
    level: number;
}

const ctx = new AudioContext({
    sampleRate: SAMPLE_RATE,
});

const voices = new Map<number, OperatorNodes[]>();

const createOperatorNode = (operator: Operator): OperatorNodes => {
    const { type, ratio, level, envelope } = operator;
    const oscNode = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscNode.type = type;
    oscNode.connect(gainNode);
    return { oscNode, gainNode, ratio, level, envelope };
};

const noteOn = (note: number, velocity: number, instrument: Instrument, master: Master): void => {
    const now = ctx.currentTime;
    noteOff(note, true);

    const { filter, operators, algorithm } = instrument;
    const filterNode = ctx.createBiquadFilter();
    filterNode.type = filter.type;
    filterNode.frequency.value = filter.cutoff;

    const masterNode = ctx.createGain();
    masterNode.gain.value = master.volume * velocity / MIDI_MAX;

    const compressorNode = ctx.createDynamicsCompressor();

    filterNode.connect(masterNode);
    masterNode.connect(compressorNode);
    compressorNode.connect(ctx.destination);

    const operatorNodes = operators.map((op) => createOperatorNode(op));

    // set algorithm
    const algo = algorithmConfig[algorithm].operators;
    const carriersCount = algo.filter((op) => 0 === op).length;

    algo.forEach((data, i) => {
        const src = operatorNodes[i];

        if (!Array.isArray(data)) {
            // carrier
            src.level /= carriersCount;
            src.gainNode.connect(filterNode);
        } else {
            // modulator
            src.level *= 3000;

            data.forEach((t) => {
                const tgt = operatorNodes[t];
                src.gainNode.connect(tgt.oscNode.frequency);
            });
        }
    });

    // play operators
    const freq = BASE_FREQUENCY * Math.pow(2, (note - 69) / 12);

    operatorNodes.forEach(({ oscNode, gainNode, ratio, level, envelope }) => {
        const { attack, decay, sustain } = envelope;
        oscNode.frequency.setValueAtTime(freq * ratio, now);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(level, now + attack);
        gainNode.gain.linearRampToValueAtTime(level * sustain, now + attack + decay);
        oscNode.start(now);
    });

    voices.set(note, operatorNodes);
};

const noteOff = (note: number, force = false): void => {
    const now = ctx.currentTime;
    const operators = voices.get(note);

    if (!operators) {
        return;
    }
    operators.forEach(({ oscNode, gainNode, envelope }) => {
        const end = force ? forcedReleaseTime : now + envelope.release;
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, end);
        oscNode.stop(end);
    });

    voices.delete(note);
};

export const Audio = {
    noteOn,
    noteOff,
};
