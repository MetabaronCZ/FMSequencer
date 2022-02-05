import { Track } from 'modules/project/track';
import { Master } from 'modules/project/master';
import { Sequence } from 'modules/project/sequence';
import { ProjectMeta } from 'modules/project/project-meta';

export interface Project {
    readonly meta: ProjectMeta;
    readonly master: Master;
    readonly tracks: Track[];
    readonly sequences: Sequence[];
}
