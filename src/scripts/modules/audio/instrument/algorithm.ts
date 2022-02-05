interface AlgorithmConfig {
    readonly [id: number]: {
        readonly operators: Array<number | number[]>;
        readonly nodes: Array<[number, number]>;
        readonly lines: Array<[number, number]>;
    };
}

export const algorithmConfig: AlgorithmConfig = {
    1: {
        operators: [0, [0], [1], [2]],
        nodes: [[1.5, 0], [1.5, 1], [1.5, 2], [1.5, 3]],
        lines: [[1, 0], [2, 1], [3, 2]],
    },
    2: {
        operators: [0, [0], [1], [1]],
        nodes: [[1.5, 0], [1.5, 1], [1, 2], [2, 2]],
        lines: [[1, 0], [2, 1], [3, 1]],
    },
    3: {
        operators: [0, [0], [1], [0]],
        nodes: [[1.5, 0], [1, 1], [1, 2], [2, 1]],
        lines: [[1, 0], [2, 1], [3, 0]],
    },
    4: {
        operators: [0, [0], [0], [2]],
        nodes: [[1.5, 0], [1, 1], [2, 1], [2, 2]],
        lines: [[1, 0], [2, 0], [3, 2]],
    },
    5: {
        operators: [0, [0], 0, [2]],
        nodes: [[1, 0], [1, 1], [2, 0], [2, 1]],
        lines: [[1, 0], [3, 2]],
    },
    6: {
        operators: [0, 0, 0, [2, 1, 0]],
        nodes: [[0.5, 0], [1.5, 0], [2.5, 0], [1.5, 1]],
        lines: [[3, 0], [3, 1], [3, 2]],
    },
    7: {
        operators: [0, 0, 0, [2]],
        nodes: [[0.5, 0], [1.5, 0], [2.5, 0], [2.5, 1]],
        lines: [[3, 2]],
    },
    8: {
        operators: [0, 0, 0, 0],
        nodes: [[0, 0], [1, 0], [2, 0], [3, 0]],
        lines: [],
    },
};
