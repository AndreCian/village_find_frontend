import {
  Home,
  Dashboard,
  Profile,
  Earning,
  Announcement,
  Events,
  DetailView,
} from '@/pages/community';
import { Login, Signup } from '@/pages/community/Auth';

import { AuthLayout, HomeLayout } from '@/components/layout/community';
import { Outlet } from 'react-router-dom';

export const communityRoutes = [
  {
    path: '',
    element: <Home />,
  },
  {
    path: '',
    element: <HomeLayout />,
    children: [
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
      {
        path: 'events',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Events />,
          },
          {
            path: ':id',
            element: <DetailView />,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
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
