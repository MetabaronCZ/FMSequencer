export const paths = {
    HOME: '/',
    INSTRUMENTS: '/instrument',
    INSTRUMENT: (id: string) => `/instrument/${id}`,
    MASTER: '/master',
};
export type PathID = keyof typeof paths;
