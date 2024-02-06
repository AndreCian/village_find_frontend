import { Navigate, Outlet } from 'react-router-dom';

import {
  CommunityIcon,
  DashboardIcon,
  FinancialsIcon,
  LogoutIcon,
  UserIcon,
  VendorIcon,
} from '@/components/icons';

import { Dashboard } from '@/pages/vendor/Dashboard';
import {
  ProfileHome,
  BankDetail,
  FulfillDetail,
  Pickup,
  PickupLocation,
  PickupLocationCreate,
  ShippingService,
  ShippingAddress,
  ParcelSize,
  ParcelCreate,
  ShippingAccount,
} from '@/pages/vendor/Profile';
import {
  General,
  ProductLayout,
  Products,
  StyleCreate,
  Styles,
  Specifications,
  Customization,
  Subscription,
  SpecCreate,
} from '@/pages/vendor/Products';
import { Financials } from '@/pages/vendor/Financials';
import { Community } from '@/pages/vendor/Community';
import { Customers } from '@/pages/vendor/Customers';
import { GoalLayout, GoalHome, Rewards } from '@/pages/vendor/Goals';
import { SupportDetail, SupportHome } from '@/pages/vendor/Support';

import { Coupons } from '@/pages';
import { OrderHome } from '@/pages';

export const vendorRoutes = [
  {
    title: 'Index',
    path: '',
    hide: true,
    element: <Navigate to="dashboard" />,
  },
  {
    title: 'Dashboard',
    path: 'dashboard',
    icon: <DashboardIcon />,
    element: <Dashboard />,
  },
  {
    title: 'Profile',
    path: 'profile',
    icon: <UserIcon />,
    element: <Outlet />,
    children: [
      {
        title: 'Business Profiles',
        path: '',
        element: <ProfileHome />,
      },
      {
        title: 'My Bank Details',
        path: 'bank-detail',
        element: <BankDetail />,
      },
      {
        title: 'Fulfillment Details',
        path: 'fulfillment',
        element: <FulfillDetail />,
        leaf: true,
        children: [
          {
            title: 'Pickup',
            path: 'pickup',
            element: <Pickup />,
          },
          {
            title: 'Delivery',
            path: 'delivery',
            element: <Pickup />,
          },
          {
            title: 'Partnered Pickup Location',
            path: 'location',
            element: <Outlet />,
            leaf: true,
            children: [
              {
                title: 'Home',
                path: '',
                element: <PickupLocation />,
              },
              {
                title: 'Create',
                path: 'create',
                element: <PickupLocationCreate />,
              },
            ],
          },
        ],
      },
      {
        title: 'Shipping Services',
        path: 'shipping-service',
        element: <ShippingService />,
      },
      {
        title: 'Shipping Address',
        path: 'shipping-address',
        element: <ShippingAddress />,
      },
      {
        title: 'Parcel Size',
        path: 'parcel-size',
        element: <Outlet />,
        leaf: true,
        children: [
          {
            title: 'Home',
            path: '',
            element: <ParcelSize />,
          },
          {
            title: 'Create',
            path: 'create',
            element: <ParcelCreate />,
          },
        ],
      },
      {
        title: 'Shipping Account',
        path: 'shipping-account',
        element: <ShippingAccount />,
      },
    ],
  },
  {
    title: 'My Products',
    path: 'products',
    icon: <UserIcon />,
    element: <Outlet />,
    leaf: true,
    children: [
      {
        title: 'Home',
        path: '',
        hide: true,
        element: <Products />,
      },
      {
        title: 'Create & Edit',
        path: ':id',
        element: <ProductLayout />,
        leaf: true,
        children: [
          {
            title: 'Home',
            path: '',
            element: <Navigate to="general" />,
          },
          {
            title: 'General',
            path: 'general',
            element: <General />,
          },
          {
            title: 'Styles',
            path: 'style',
            element: <Outlet />,
            children: [
              {
                title: 'Home',
                path: '',
                element: <Styles />,
              },
              {
                title: 'Create',
                path: 'create',
                element: <StyleCreate />,
              },
            ],
          },
          {
            title: 'Specifications',
            path: 'specifications',
            element: <Outlet />,
            children: [
              {
                title: 'Home',
                path: '',
                element: <Specifications />,
              },
              {
                title: 'Create',
                path: 'create',
                element: <SpecCreate />,
              },
            ],
          },
          {
            title: 'Customization',
            path: 'customziation',
            element: <Customization />,
          },
          {
            title: 'Subscription',
            path: 'subscription',
            element: <Subscription />,
          },
        ],
      },
    ],
  },
  {
    title: 'Orders',
    path: 'order',
    icon: <UserIcon />,
    element: <OrderHome />,
  },
  {
    title: 'Financials',
    path: 'financial',
    icon: <FinancialsIcon />,
    element: <Financials />,
  },
  {
    title: 'Customers',
    path: 'customer',
    icon: <VendorIcon />,
    element: <Customers />,
  },
  {
    title: 'Community',
    path: 'community',
    icon: <CommunityIcon />,
    element: <Community />,
  },
  {
    title: 'Goals',
    path: 'goals',
    icon: <UserIcon />,
    element: <GoalLayout />,
    leaf: true,
    children: [
      {
        title: 'Home',
        path: '',
        element: <GoalHome />,
      },
      {
        title: 'Reward',
        path: 'reward',
        element: <Rewards />,
      },
    ],
  },
  {
    title: 'Coupon Center',
    path: 'coupon-center',
    icon: <UserIcon />,
    leaf: true,
    element: <Outlet />,
    children: [
      {
        title: 'Home',
        path: '',
        element: <Coupons />,
      },
    ],
  },
  {
    title: 'Support',
    path: 'support',
    icon: <UserIcon />,
    leaf: true,
    children: [
      {
        title: 'Home',
        path: '',
        element: <SupportHome />,
      },
      {
        title: 'Detail',
        path: 'detail',
        element: <SupportDetail />,
      },
    ],
  },
  {
    title: 'Logout',
    path: 'logout',
    icon: <LogoutIcon />,
  },
];
