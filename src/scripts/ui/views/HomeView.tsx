import React from 'react';
import { Navigate } from 'react-router';

import { paths } from 'modules/paths';

export const HomeView: React.FC = () => (
    <Navigate to={paths.INSTRUMENTS} />
);
