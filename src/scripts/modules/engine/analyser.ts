import { Node } from 'modules/engine/node';

const FFT_SIZE = 2048;

export class Analyser extends Node<AnalyserNode> {
    public readonly bufferLength: number;
    private readonly data: Uint8Array;

    constructor(ctx: AudioContext) {
        const node = ctx.createAnalyser();
        super(node);

        this.bufferLength = node.frequencyBinCount;
        this.data = new Uint8Array(this.bufferLength);
        node.fftSize = FFT_SIZE;
    }

    public getData(): Uint8Array {
        const { data } = this;
        this.node.getByteTimeDomainData(data);
        return data;
    }
}
