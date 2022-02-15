import { Node } from 'modules/engine/node';

export class Compressor extends Node<DynamicsCompressorNode> {
    constructor(ctx: AudioContext) {
        const node = ctx.createDynamicsCompressor();
        super(node);
    }
}
