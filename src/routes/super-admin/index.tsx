import { Outlet } from 'react-router-dom';

import {
  DashboardIcon,
  UserIcon,
  VendorIcon,
  CommunityIcon,
  FinancialsIcon,
  LogoutIcon,
} from '@/components';

import { Dashboard } from '@/pages/super-admin';
import {
  SettingsLayout,
  Imagry,
  Products,
  Slider,
  HowPage,
  Shop,
  Vendor,
  ReadyToShop,
  Footer,
  ProductTags,
  NewProductTag,
  Metrics,
  NewMetric,
  Categories,
  NewCategory,
  Posts,
  NewPost,
} from '@/pages/super-admin/Settings';
import {
  CustomerHome,
  Coupons,
  CustomerEdit,
  CouponEdit,
} from '@/pages/super-admin/Customers';
import { OrderHome, OrderDetail } from '@/pages/super-admin/Orders';
import {
  VendorsHome,
  VendorDetail,
  Subscription,
} from '@/pages/super-admin/Vendors';
import { VillageCommunity, VillageEdit } from '@/pages/super-admin/Communities';
import { Transactions } from '@/pages/super-admin/Financials';

export const superAdminRoutes = [
  {
    title: 'Dashboard',
    path: 'dashboard',
    element: <Dashboard />,
    icon: <DashboardIcon />,
  },
  {
    title: 'Settings',
    path: 'settings',
    element: <SettingsLayout />,
    icon: <UserIcon />,
    children: [
      {
        title: 'Marketplace',
        path: 'market',
        element: <Outlet />,
        children: [
          {
            title: 'Imagry',
            path: 'imagry',
            element: <Imagry />,
          },
          {
            title: 'Featured Products',
            path: 'products',
            element: <Products />,
          },
          {
            title: 'Home Page',
            path: 'home-page',
            element: <Outlet />,
            leaf: true,
            children: [
              {
                title: 'Home Slider',
                path: '',
                element: <Slider />,
              },
              {
                title: 'How It Works',
                path: 'how',
                element: <HowPage />,
              },
              {
                title: 'Shop Intentionally',
                path: 'shop',
                element: <Shop />,
              },
              {
                title: 'Vendor Community Images',
                path: 'v-com',
                element: <Vendor />,
              },
              {
                title: 'Ready To Shop Images',
                path: 'ready-to-shop',
                element: <ReadyToShop />,
              },
            ],
          },
          {
            title: 'Footer',
            path: 'footer',
            element: <Footer />,
          },
        ],
      },
      {
        title: 'Dashboard',
        path: 'dashboard',
        element: <Outlet />,
        children: [
          {
            title: 'Product Tags',
            path: 'tags',
            element: <Outlet />,
            leaf: true,
            children: [
              {
                title: 'Home',
                path: '',
                element: <ProductTags />,
              },
              {
                title: 'New',
                path: ':id',
                element: <NewProductTag />,
              },
            ],
          },
          {
            title: 'Metrics',
            path: 'metrics',
            element: <Outlet />,
            leaf: true,
            children: [
              {
                title: 'Home',
                path: '',
                element: <Metrics />,
              },
              {
                title: 'New',
                path: ':id',
                element: <NewMetric />,
              },
            ],
          },
          {
            title: 'Category Management',
            path: 'category',
            element: <Outlet />,
            leaf: true,
            children: [
              {
                title: 'Home',
                path: '',
                element: <Categories />,
              },
              {
                title: 'New',
                path: ':id',
                element: <NewCategory />,
              },
            ],
          },
          {
            title: 'Support Center',
            path: 'posts',
            element: <Outlet />,
            leaf: true,
            children: [
              {
                title: 'Home',
                path: '',
                element: <Posts />,
              },
              {
                title: 'New',
                path: ':id',
                element: <NewPost />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Customers',
    path: 'customers',
    element: <Outlet />,
    icon: <UserIcon />,
    children: [
      {
        title: 'Customer Management',
        path: 'home',
        leaf: true,
        element: <Outlet />,
        children: [
          {
            title: 'Home',
            path: '',
            element: <CustomerHome />,
          },
          {
            title: 'Edit',
            path: ':id',
            element: <CustomerEdit />,
          },
        ],
      },
      {
        title: 'Coupon Management',
        path: 'coupon',
        leaf: true,
        element: <Outlet />,
        children: [
          {
            title: 'Home',
            path: '',
            element: <Coupons />,
          },
          {
            title: 'Edit',
            path: ':id',
            element: <CouponEdit />,
          },
        ],
      },
    ],
  },
  {
    title: 'Order Management',
    path: 'orders',
    element: <Outlet />,
    icon: <UserIcon />,
    children: [
      {
        title: 'All Orders',
        path: 'home',
        element: <Outlet />,
        leaf: true,
        children: [
          {
            title: 'Home',
            path: '',
            element: <OrderHome />,
          },
          {
            title: 'Detail',
            path: 'detail',
            element: <OrderDetail />,
          },
        ],
      },
    ],
  },
  {
    title: 'Vendor Management',
    path: 'vendors',
    element: <Outlet />,
    icon: <VendorIcon />,
    children: [
      {
        title: 'All Vendors',
        path: '',
        element: <Outlet />,
        leaf: true,
        children: [
          {
            title: 'Home',
            path: '',
            element: <VendorsHome />,
          },
          {
            title: 'Detail',
            path: ':id',
            element: <VendorDetail />,
          },
        ],
      },
      {
        title: 'Subscription Packages',
        path: 'subscription',
        element: <Subscription />,
      },
    ],
  },
  {
    title: 'Community',
    path: 'community',
    element: <Outlet />,
    icon: <CommunityIcon />,
    children: [
      {
        title: 'Village Communities',
        path: 'village',
        element: <Outlet />,
        leaf: true,
        children: [
          {
            title: 'Home',
            path: '',
            element: <VillageCommunity />,
          },
          {
            title: 'Edit',
            path: ':id',
            element: <VillageEdit />,
          },
        ],
      },
      // {
      //   title: 'Featured Communities',
      //   path: 'featured',
      //   element: <></>,
      // },
    ],
  },
  {
    title: 'Financials',
    path: 'financials',
    element: <Outlet />,
    icon: <FinancialsIcon />,
    children: [
      {
        title: 'Customer Transactions',
        path: 'transactions',
        element: <Transactions />,
      },
    ],
  },
  {
    title: 'Logout',
    path: 'logout',
    element: <></>,
    icon: <LogoutIcon />,
  },
];
