import { FunctionComponent } from 'react';

import { paths } from 'modules/paths';

import { HomeView } from 'ui/views/HomeView';
import { ErrorView } from 'ui/views/ErrorView';
import { MasterView } from 'ui/views/MasterView';
import { InstrumentView } from 'ui/views/InstrumentView';

interface Route {
    readonly path: string;
    readonly component: FunctionComponent;
}

export const routes: Route[] = [
    { path: paths.HOME, component: HomeView },
    { path: paths.INSTRUMENT(':id'), component: InstrumentView },
    { path: paths.INSTRUMENTS, component: InstrumentView },
    { path: paths.MASTER, component: MasterView },
    { path: '*', component: ErrorView },
];
