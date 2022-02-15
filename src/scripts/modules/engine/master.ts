import { Bus } from 'modules/engine/bus';
import { Level } from 'modules/engine/level';
import { MasterData } from 'modules/audio/master';
import { Compressor } from 'modules/engine/compressor';

export class Master extends Bus<Level, Compressor> {
    public readonly level: Level;
    public readonly compressor: Compressor;

    constructor(ctx: AudioContext) {
        const level = new Level(ctx);
        const compressor = new Compressor(ctx);
        super(level, compressor);

        this.level = level;
        this.compressor = compressor;
        this.level.connect(this.compressor);
    }

    public set(value: MasterData, time: number): void {
        this.level.set(value.level, time);
    }
}
