import { LEVEL_MAX } from 'modules/engine/config';
import { Node } from 'modules/engine/node';

export class Level extends Node<GainNode> {
  constructor(ctx: AudioContext) {
    const node = ctx.createGain();
    super(node);
  }

  public set(value: number, time: number): void {
    this.node.gain.setValueAtTime(value / LEVEL_MAX, time);
  }

  public animate(value: number, time: number, duration: number): void {
    this.node.gain.linearRampToValueAtTime(value / LEVEL_MAX, time + duration);
  }

  public stopAnimation(time: number): void {
    const { node } = this;
    const { value } = node.gain;
    node.gain.setValueAtTime(value, time);
  }

  public reset(time: number): void {
    this.node.gain.cancelScheduledValues(time);
  }
}
