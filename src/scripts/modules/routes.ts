import { FunctionComponent } from 'react';

import { PathID } from 'modules/paths';

import { HomeView } from 'ui/views/HomeView';
import { ErrorView } from 'ui/views/ErrorView';
import { MasterView } from 'ui/views/MasterView';
import { InstrumentView } from 'ui/views/InstrumentView';

interface Route {
    readonly path: PathID | '*';
    readonly component: FunctionComponent;
}

export const routes: Route[] = [
    { path: 'HOME', component: HomeView },
    { path: 'INSTRUMENT', component: InstrumentView },
    { path: 'INSTRUMENTS', component: InstrumentView },
    { path: 'MASTER', component: MasterView },
    { path: '*', component: ErrorView },
];
