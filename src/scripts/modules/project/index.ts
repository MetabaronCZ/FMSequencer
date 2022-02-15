import { MasterData } from 'modules/audio/master';
import { TrackData } from 'modules/project/track';
import { SequenceData } from 'modules/project/sequence';
import { ProjectMetaData } from 'modules/project/project-meta';

export interface Project {
    readonly meta: ProjectMetaData;
    readonly master: MasterData;
    readonly tracks: TrackData[];
    readonly sequences: SequenceData[];
}
