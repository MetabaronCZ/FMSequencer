export const paths = {
    HOME: '/',
    INSTRUMENTS: '/instrument',
    INSTRUMENT: '/instrument/:id',
    MASTER: '/master',
    '*': '*',
};
export type PathID = keyof typeof paths;
