interface SequenceTrack {
    readonly pattern: number;
    readonly repeat: number;
}

export interface Sequence {
    readonly bars: number; // length in bars
    readonly tracks: SequenceTrack[];
}
