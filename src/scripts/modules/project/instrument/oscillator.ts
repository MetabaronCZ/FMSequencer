import { OscillatorTypeID } from 'modules/engine/config';

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
