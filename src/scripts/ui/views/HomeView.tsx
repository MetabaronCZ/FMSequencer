import React from 'react';
import { Navigate } from 'react-router';

import { paths } from 'ui/paths';

export const HomeView: React.FC = () => (
    <Navigate to={paths.SEQUENCES} />
);
