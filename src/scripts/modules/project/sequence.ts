interface SequenceTrackData {
    readonly pattern: number;
    readonly repeat: number;
}

export interface SequenceData {
    readonly bars: number; // length in bars
    readonly tracks: SequenceTrackData[];
}
