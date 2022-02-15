export const oscillatorTypes = ['SIN', 'TRI', 'SAW', 'SQR'] as const;
export type OscillatorTypeID = typeof oscillatorTypes[number];

type OscillatorTypeData = {
    readonly [id in OscillatorTypeID]: OscillatorType;
};
const oscillatorTypeData: OscillatorTypeData = {
    SIN: 'sine',
    TRI: 'triangle',
    SAW: 'sawtooth',
    SQR: 'square',
};

export const getOscillatorType = (id: OscillatorTypeID): OscillatorType => {
    return oscillatorTypeData[id];
};
