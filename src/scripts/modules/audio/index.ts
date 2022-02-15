import { SAMPLE_RATE } from 'modules/audio/config';

import { PAN_MAX } from 'modules/audio/instrument/pan';
import { LEVEL_MAX } from 'modules/audio/instrument/level';
import { VELOCITY_MAX } from 'modules/audio/instrument/velocity';
import { FREQUENCY_BASE } from 'modules/audio/instrument/frequency';

import { MasterData } from 'modules/audio/master';
import { InstrumentData } from 'modules/audio/instrument';
import { getFilterType } from 'modules/audio/instrument/filter';
import { EnvelopeData } from 'modules/audio/instrument/envelope';
import { OperatorData } from 'modules/audio/instrument/operator';
import { algorithmConfig } from 'modules/audio/instrument/algorithm';
import { getOscillatorType } from 'modules/audio/instrument/oscillator';

const forcedReleaseTime = 0.01;

interface OperatorNodes {
    readonly oscNode: OscillatorNode;
    readonly gainNode: GainNode;
    readonly envelope: EnvelopeData;
    readonly ratio: number;
    level: number;
}

const ctx = new AudioContext({
    sampleRate: SAMPLE_RATE,
});

const voices = new Map<number, OperatorNodes[]>();

const createOperatorNode = (operator: OperatorData): OperatorNodes => {
    const { type, ratio, level, envelope } = operator;
    const oscNode = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscNode.type = getOscillatorType(type);
    oscNode.connect(gainNode);
    return { oscNode, gainNode, ratio, level, envelope };
};

const noteOn = (note: number, velocity: number, instrument: InstrumentData, master: MasterData): void => {
    const now = ctx.currentTime;
    noteOff(note, true);

    const { algorithm, level, pan, filter, operators } = instrument;
    const filterNode = ctx.createBiquadFilter();
    filterNode.type = getFilterType(filter.type);
    filterNode.frequency.value = filter.cutoff;
    filterNode.Q.value = filter.resonance;

    const ampNode = ctx.createGain();
    ampNode.gain.value = (level / LEVEL_MAX) * (velocity / VELOCITY_MAX);

    const panNode = ctx.createStereoPanner();
    panNode.pan.value = pan / PAN_MAX;

    filterNode.connect(ampNode);
    ampNode.connect(panNode);

    const masterNode = ctx.createGain();
    masterNode.gain.value = master.level / LEVEL_MAX;

    const compressorNode = ctx.createDynamicsCompressor();

    panNode.connect(masterNode);
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
    const freq = FREQUENCY_BASE * Math.pow(2, (note - 69) / 12);

    operatorNodes.forEach(({ oscNode, gainNode, ratio, level, envelope }) => {
        const { attack, decay, sustain } = envelope;
        level /= LEVEL_MAX;

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
