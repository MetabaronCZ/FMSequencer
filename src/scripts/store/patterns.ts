import { PayloadAction } from '@reduxjs/toolkit';

import { ProjectReducer } from 'store/project';
import { TrackActionPayload } from 'store/track';

import { createPatternData } from 'modules/project/pattern';

type AddTrackPatternAction = PayloadAction<TrackActionPayload<null>>;
type DeleteTrackPatternAction = PayloadAction<TrackActionPayload<number>>;
export type PatternsActions = AddTrackPatternAction | DeleteTrackPatternAction;

const addTrackPattern: ProjectReducer<AddTrackPatternAction> = (state, action) => {
    const { track } = action.payload;
    const data = createPatternData();
    state.tracks[track].patterns.push(data);
};

const deleteTrackPattern: ProjectReducer<DeleteTrackPatternAction> = (state, action) => {
    const { track, data } = action.payload;
    const { patterns } = state.tracks[track];
    patterns.splice(data, 1);

    // keep at least one pattern
    if (0 === patterns.length) {
        const data = createPatternData();
        patterns.push(data);
    }
};

export const patternsReducer = {
    addTrackPattern,
    deleteTrackPattern,
};
