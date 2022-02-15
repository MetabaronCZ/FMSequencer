import { Node } from 'modules/engine/node';

export abstract class Bus<T extends Node = Node, U extends Node = Node> {
    public readonly input: T;
    public readonly output: U;

    constructor(input: T, output: U) {
        this.input = input;
        this.output = output;
    }

    public connect(bus: Bus): void {
        this.output.connect(bus.input);
    }

    public disconnect(): void {
        this.output.disconnect();
    }
}
