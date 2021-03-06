import { limitNumber } from 'core/number';

import {
  FREQUENCY_MAX,
  FREQUENCY_MIN,
  OscillatorTypeID,
} from 'modules/engine/config';
import { Node } from 'modules/engine/node';
import { getOscillatorType } from 'modules/project/instrument/oscillator';

export class Oscillator extends Node<OscillatorNode> {
  constructor(ctx: AudioContext) {
    const node = ctx.createOscillator();
    super(node);
  }

  public getFrequencyParam(): AudioParam {
    return this.node.frequency;
  }

  public setType(value: OscillatorTypeID): void {
    this.node.type = getOscillatorType(value);
  }

  public setFrequency(value: number, time: number): void {
    value = limitNumber(value, FREQUENCY_MIN, FREQUENCY_MAX);
    this.node.frequency.setValueAtTime(value, time);
  }

  public start(time: number): void {
    this.node.start(time);
  }

  public stop(time: number): void {
    this.node.stop(time);
  }

  public reset(): void {
    const { context } = this.node;
    this.disconnect();
    this.node = context.createOscillator();
  }
}
