export interface SessionData {
    readonly soloedTrack: number | null;
    readonly mutedTracks: number[];
}

export interface SessionConfig {
    readonly soloedTrack?: number | null;
    readonly mutedTracks?: number[];
}

export const createSessionData = (config: SessionConfig = {}): SessionData => {
    return {
        soloedTrack: config.soloedTrack ?? null,
        mutedTracks: config.mutedTracks ?? [],
    };
};
