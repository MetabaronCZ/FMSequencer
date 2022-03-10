import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';

import { SongActions, songReducer } from 'store/song';
import { TracksActions, tracksReducer } from 'store/track';
import { MasterActions, masterReducer } from 'store/master';
import { SequencesActions, sequencesReducer } from 'store/sequences';

import {
    PROJECT_DESCRIPTION_LENGTH, PROJECT_NAME_LENGTH,
    TEMPO_MAX, TEMPO_MIN,
} from 'modules/project/config';
import { AudioEngine } from 'modules/engine';
import { limitNumber } from 'modules/core/number';
import { createProjectData, ProjectConfig, ProjectData } from 'modules/project';

type LoadProjectAction = PayloadAction<ProjectConfig>;
type SetProjectNameAction = PayloadAction<string>;
type SetProjectDescriptionAction = PayloadAction<string>;
type SetProjectTempoAction = PayloadAction<number>;

export type ProjectActions =
    LoadProjectAction |
    SetProjectNameAction | SetProjectDescriptionAction | SetProjectTempoAction |
    MasterActions | TracksActions | SequencesActions | SongActions;

export type ProjectReducer<T extends PayloadAction<unknown>> = (state: WritableDraft<ProjectData>, action: T) => void;

export const projectSlice = createSlice({
    name: 'project',
    initialState: () => {
        const state = createProjectData();

        const time = AudioEngine.getTime();
        AudioEngine.master.set(state.master, time);

        state.tracks.forEach((track, i) => {
            AudioEngine.voices[i].set(track.instrument, time);
        });

        return state;
    },
    reducers: {
        load: (state, action: LoadProjectAction) => {
            return createProjectData(action.payload);
        },
        setName: (state, action: SetProjectNameAction) => {
            state.name = action.payload.substring(0, PROJECT_NAME_LENGTH);
        },
        setDescription: (state, action: SetProjectDescriptionAction) => {
            state.description = action.payload.substring(0, PROJECT_DESCRIPTION_LENGTH);
        },
        setTempo: (state, action: SetProjectTempoAction) => {
            state.tempo = limitNumber(action.payload, TEMPO_MIN, TEMPO_MAX);
        },
        ...masterReducer,
        ...tracksReducer,
        ...sequencesReducer,
        ...songReducer,
    },
});
