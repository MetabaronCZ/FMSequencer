export abstract class Node<T extends AudioNode = AudioNode> {
    protected node: T;

    constructor(node: T) {
        this.node = node;
    }

    public connect(out: Node | AudioNode | AudioParam): void {
        if (out instanceof Node) {
            this.node.connect(out.node);
        } else if (out instanceof AudioNode) {
            this.node.connect(out);
        } else {
            this.node.connect(out);
        }
    }

    public disconnect(): void {
        this.node.disconnect();
    }
}
