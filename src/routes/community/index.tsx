import { HomeLayout } from '@/components/layout/community';

import {
  Home,
  Dashboard,
  Profile,
  Earning,
  Announcement,
} from '@/pages/community';
import { Login, Signup } from '@/pages/community/Auth';

import { Outlet } from 'react-router-dom';

export const communityRoutes = [
  {
    path: '',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'earning',
        element: <Earning />,
      },
      {
        path: 'announcement',
        element: <Announcement />,
      },
    ],
  },
  {
    path: 'auth',
    element: <Outlet />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Signup />,
      },
    ],
  },
];
