import { Outlet, Navigate } from 'react-router-dom';

import { Login, Signup as CustomerSignup } from '@/pages/customer';
import {
  Dashboard,
  Market,
  VendorSales,
  ProductDetails,
  Checkout,
  About,
  VendorSignup,
} from '@/pages/customer';
import {
  Home as CommunityHome,
  CommunityLayout,
} from '@/pages/customer/VendorCommunities';

export const customerRoutes = [
  {
    path: '',
    element: <Navigate to="dashboard" />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    path: 'login',
    element: <Outlet />,
    children: [
      {
        path: 'customer',
        element: <Login />,
      },
      {
        path: 'vendor',
        element: <Login />,
      },
      {
        path: '*',
        element: <Navigate to="customer" />,
      },
    ],
  },
  {
    path: 'sign-up',
    element: <Outlet />,
    children: [
      {
        path: 'customer',
        element: <CustomerSignup />,
      },
      {
        path: 'vendor',
        element: <VendorSignup />,
      },
    ],
  },
  {
    path: 'sell',
    element: <VendorSales />,
  },
  {
    path: 'market',
    element: <Market />,
  },
  {
    element: <Outlet />,
    path: 'communities',
    children: [
      {
        path: '',
        element: <CommunityHome />,
      },
      {
        path: ':slug',
        element: <CommunityLayout />,
      },
    ],
  },
  {
    path: 'productdetails/:id',
    element: <ProductDetails />,
  },
  {
    path: 'checkout',
    element: <Checkout />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: '*',
    element: <p>Not found!</p>,
  },
];
