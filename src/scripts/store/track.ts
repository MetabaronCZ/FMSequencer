import { PatternsActions, patternsReducer } from 'store/patterns';
import { InstrumentActions, instrumentReducer } from 'store/instrument';

export type TracksActions = PatternsActions | InstrumentActions;

export interface TrackActionPayload<T> {
    readonly track: number; // track ID (index)
    readonly data: T;
}

export const tracksReducer = {
    ...patternsReducer,
    ...instrumentReducer,
};
