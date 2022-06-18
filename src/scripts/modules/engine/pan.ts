import { PAN_MAX } from 'modules/engine/config';
import { Node } from 'modules/engine/node';

export class Pan extends Node<StereoPannerNode> {
  constructor(ctx: AudioContext) {
    const node = ctx.createStereoPanner();
    super(node);
  }

  public set(value: number, time: number): void {
    this.node.pan.setValueAtTime(value / PAN_MAX, time);
  }
}
