import { OPERATOR_COUNT } from 'modules/audio/config';
import { VELOCITY_MAX } from 'modules/audio/instrument/velocity';
import { FREQUENCY_BASE } from 'modules/audio/instrument/frequency';

import { Bus } from 'modules/engine/bus';
import { Pan } from 'modules/engine/pan';
import { Level } from 'modules/engine/level';
import { Filter } from 'modules/engine/filter';
import { Operator } from 'modules/engine/operator';
import { InstrumentData } from 'modules/audio/instrument';
import { algorithmConfig, AlgorithmID, isAlgorithmConfigCarrier } from 'modules/audio/instrument/algorithm';

const MODULATOR_LEVEL_MULTIPLIER = 3000;

export class Voice extends Bus<Filter, Pan> {
    public readonly filter: Filter;
    public readonly level: Level;
    public readonly pan: Pan;
    public readonly operators: Operator[];

    constructor(ctx: AudioContext) {
        const filter = new Filter(ctx);
        const level = new Level(ctx);
        const pan = new Pan(ctx);
        super(filter, pan);

        this.pan = pan;
        this.level = level;
        this.filter = filter;
        this.operators = new Array(OPERATOR_COUNT).fill(0).map(() => new Operator(ctx));

        filter.connect(level);
        level.connect(pan);
    }

    public setAlgorithm(algoId: AlgorithmID, time: number): void {
        this.connectOperators(algoId, time);
    }

    public noteOn(note: number, velocity: number, data: InstrumentData, time: number): void {
        const { algorithm, filter, level, pan, operators } = data;
        const baseFrequency = FREQUENCY_BASE * Math.pow(2, (note - 69) / 12);
        const vel = velocity / VELOCITY_MAX;

        this.noteOff(time, true);

        this.filter.set(filter, time);
        this.level.set(level * vel, time);
        this.pan.set(pan, time);

        for (const op of this.operators) {
            op.reset(time);
        }
        this.connectOperators(algorithm, time);

        this.operators.forEach((op, i) => {
            op.start(baseFrequency, operators[i], time);
        });
    }

    public noteOff(time: number, force = false): void {
        this.operators.forEach((op) => {
            op.stop(time, force);
        });
    }

    private connectOperators(algoId: AlgorithmID, time: number): void {
        const { operators, filter } = this;

        for (const op of operators) {
            op.disconnect();
        }
        const algo = algorithmConfig[algoId].operators;

        algo.forEach((data, i) => {
            const src = operators[i];

            if (isAlgorithmConfigCarrier(data)) {
                // carrier
                src.output.connect(filter);
            } else {
                // modulator
                src.setLevelMultiplier(MODULATOR_LEVEL_MULTIPLIER, time);

                data.forEach((t) => {
                    const tgt = operators[t];
                    tgt.FM(src.output);
                });
            }
        });
    }
}
