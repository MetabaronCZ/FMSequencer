import { fillArray } from 'core/array';

import { Voice } from 'modules/engine/voice';
import { Master } from 'modules/engine/master';
import { SAMPLE_RATE, TRACK_COUNT } from 'modules/engine/config';

class Engine {
  public readonly master: Master;
  public readonly voices: Voice[];
  private readonly context: AudioContext;

  constructor() {
    const ctx = new AudioContext({
      sampleRate: SAMPLE_RATE,
    });

    this.context = ctx;
    this.voices = fillArray(TRACK_COUNT, () => new Voice(ctx));
    this.master = new Master(ctx);

    for (const voice of this.voices) {
      voice.output.connect(this.master.input);
    }
    this.master.output.connect(ctx.destination);
  }

  public getTime(): number {
    return this.context.currentTime;
  }
}

export const AudioEngine = new Engine();
