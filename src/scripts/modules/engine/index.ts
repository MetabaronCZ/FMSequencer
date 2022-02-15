import { Voice } from 'modules/engine/voice';
import { Master } from 'modules/engine/master';
import { SAMPLE_RATE, VOICE_COUNT } from 'modules/audio/config';

class Engine {
    public readonly master: Master;
    public readonly voices: Voice[];
    private readonly context: AudioContext;

    constructor() {
        const ctx = new AudioContext({
            sampleRate: SAMPLE_RATE,
        });

        this.context = ctx;
        this.voices = new Array(VOICE_COUNT).fill(0).map(() => new Voice(ctx));
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
