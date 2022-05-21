export interface SessionData {
    readonly sequence: number;
    readonly track: number;
    readonly pattern: number;
    readonly soloedTrack: number | null;
    readonly mutedTracks: number[];
}

export interface SessionConfig {
    readonly sequence?: number;
    readonly track?: number;
    readonly pattern?: number;
    readonly soloedTrack?: number | null;
    readonly mutedTracks?: number[];
}

export const createSessionData = (config: SessionConfig = {}): SessionData => {
    return {
        sequence: config.sequence ?? 0,
        track: config.track ?? 0,
        pattern: config.pattern ?? 0,
        soloedTrack: config.soloedTrack ?? null,
        mutedTracks: config.mutedTracks ?? [],
    };
};
