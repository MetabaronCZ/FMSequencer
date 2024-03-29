import { AudioEngine } from 'modules/engine';
import { Bus } from 'modules/engine/bus';
import {
  ENVELOPE_SUSTAIN_MAX,
  FORCED_RELEASE_TIME,
  OscillatorTypeID,
  RatioID,
} from 'modules/engine/config';
import { Level } from 'modules/engine/level';
import { Node } from 'modules/engine/node';
import { Oscillator } from 'modules/engine/oscillator';
import { OperatorData } from 'modules/project/instrument/operator';
import { getRatioValue } from 'modules/project/instrument/ratio';

export class Operator extends Bus<Oscillator, Level> {
  private readonly osc: Oscillator;
  private readonly level: Level;

  private levelMultiplier: number;
  private activeBaseFrequency: number;
  private activeData: OperatorData | null;

  constructor(ctx: AudioContext) {
    const osc = new Oscillator(ctx);
    const level = new Level(ctx);
    super(osc, level);

    this.activeData = null;
    this.activeBaseFrequency = 0;
    this.levelMultiplier = 1;

    this.osc = osc;
    this.level = level;
    this.osc.connect(this.level);
  }

  public set(value: OperatorData, time: number): void {
    this.setType(value.type);
    this.setLevel(value.level, time);
  }

  public setActive(active: boolean): void {
    if (!active) {
      const time = AudioEngine.getTime();
      this.stop(time, true);
    }
  }

  public setType(value: OscillatorTypeID): void {
    this.osc.setType(value);
  }

  public setLevel(value: number, time: number): void {
    this.level.set(value * this.levelMultiplier, time);
  }

  public setLevelMultiplier(value: number, time: number): void {
    const { activeData } = this;
    this.levelMultiplier = value;

    if (!activeData) {
      return;
    }
    this.setLevel(activeData.level, time);
  }

  public setRatio(value: RatioID, time: number): void {
    const ratio = getRatioValue(value);
    this.osc.setFrequency(this.activeBaseFrequency * ratio, time);
  }

  public start(baseFrequency: number, data: OperatorData, time: number): void {
    if (!data.active) {
      return;
    }
    const { type, level, ratio, envelope } = data;
    this.activeBaseFrequency = baseFrequency;

    this.setType(type);
    this.setRatio(ratio, time);

    const { attack, decay, sustain } = envelope;
    const opLevel = level * this.levelMultiplier;
    this.level.set(0, time);
    this.level.animate(opLevel, time, attack);
    this.level.animate(
      (opLevel * sustain) / ENVELOPE_SUSTAIN_MAX,
      time,
      attack + decay
    );

    this.osc.start(time);
    this.activeData = data;
  }

  public stop(time: number, force: boolean): void {
    const { activeData } = this;

    if (!activeData) {
      return;
    }
    const release = force ? FORCED_RELEASE_TIME : activeData.envelope.release;
    this.level.stopAnimation(time);
    this.level.animate(0, time, release);

    this.osc.stop(time + release);

    this.activeData = null;
    this.activeBaseFrequency = 0;
  }

  public reset(time: number): void {
    this.osc.reset();
    this.osc.connect(this.level);
    this.level.reset(time);
    this.levelMultiplier = 1;
  }

  public FM(src: Node): void {
    src.connect(this.osc.getFrequencyParam());
  }
}
