export const paths = {
    HOME: '/',
    SEQUENCES: '/sequence',
    SEQUENCE: (id: string) => `/sequence/${id}`,
    PATTERNS: '/pattern',
    PATTERN: (trackId: string, patternId: string) => `/pattern/${trackId}/${patternId}`,
    SONG: '/song',
    INSTRUMENTS: '/instrument',
    INSTRUMENT: (id: string) => `/instrument/${id}`,
    PROJECT: '/project',
};
export type PathID = keyof typeof paths;
