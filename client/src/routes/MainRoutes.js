import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const ViewIssuePage = Loadable(lazy(() => import('pages/issue/ViewIssuePage')));
const CreateIssuePage = Loadable(lazy(() => import('pages/issue/CreateIssuePage')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            children: [
                {
                    path: 'main',
                    element: <DashboardDefault />
                },
                {
                    path: 'page/:id',
                    element: <ViewIssuePage />
                },
                {
                    path: 'create',
                    element: <CreateIssuePage />
                }
            ]
        }
    ]
};

export default MainRoutes;
