import { FunctionComponent } from 'react';

import { paths } from 'ui/paths';
import { HomeView } from 'ui/views/HomeView';
import { SongView } from 'ui/views/SongView';
import { ErrorView } from 'ui/views/ErrorView';
import { MasterView } from 'ui/views/MasterView';
import { PatternView } from 'ui/views/PatternView';
import { SequenceView } from 'ui/views/SequenceView';
import { InstrumentView } from 'ui/views/InstrumentView';
import { ProjectView } from 'ui/views/ProjectView';

interface Route {
    readonly path: string;
    readonly component: FunctionComponent;
}

export const routes: Route[] = [
    { path: paths.HOME, component: HomeView },
    { path: paths.SEQUENCES, component: SequenceView },
    { path: paths.SEQUENCE(':id'), component: SequenceView },
    { path: paths.PATTERNS, component: PatternView },
    { path: paths.PATTERN(':trackId', ':patternId'), component: PatternView },
    { path: paths.SONG, component: SongView },
    { path: paths.INSTRUMENT(':id'), component: InstrumentView },
    { path: paths.INSTRUMENTS, component: InstrumentView },
    { path: paths.MASTER, component: MasterView },
    { path: paths.PROJECT, component: ProjectView },
    { path: '*', component: ErrorView },
];
