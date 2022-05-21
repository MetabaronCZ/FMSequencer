import { FunctionComponent } from 'react';

import { paths } from 'ui/paths';
import { HomeView } from 'ui/views/HomeView';
import { ErrorView } from 'ui/views/ErrorView';

interface Route {
    readonly path: string;
    readonly component: FunctionComponent;
}

export const routes: Route[] = [
    { path: paths.HOME, component: HomeView },
    { path: '*', component: ErrorView },
];
