import { FilterData, FilterTypeID, getFilterType } from 'modules/audio/instrument/filter';
import { Node } from 'modules/engine/node';

export class Filter extends Node<BiquadFilterNode> {
    constructor(ctx: AudioContext) {
        const node = ctx.createBiquadFilter();
        super(node);
    }

    public set(value: FilterData, time: number): void {
        this.setType(value.type);
        this.setCutoff(value.cutoff, time);
        this.setResonance(value.resonance, time);
    }

    public setType(value: FilterTypeID): void {
        this.node.type = getFilterType(value);
    }

    public setCutoff(value: number, time: number): void {
        this.node.frequency.setValueAtTime(value, time);
    }

    public setResonance(value: number, time: number): void {
        this.node.Q.setValueAtTime(value, time);
    }
}
