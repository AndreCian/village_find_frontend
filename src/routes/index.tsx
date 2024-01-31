import {
  CommunityLayout,
  CustomerLayout,
  OtherLayout,
} from '@/components/layout';

import { superAdminRoutes } from '@/routes/super-admin';
import { customerRoutes } from '@/routes/customer';
import { vendorRoutes } from '@/routes/vendor';
import { communityRoutes } from '@/routes/community';

export const routes = [
  {
    path: 'admin',
    element: <OtherLayout />,
    children: superAdminRoutes,
  },
  {
    path: 'vendor',
    element: <OtherLayout />,
    children: vendorRoutes,
  },
  {
    path: 'village-community',
    element: <CommunityLayout />,
    children: communityRoutes,
  },
  {
    path: '',
    element: <CustomerLayout />,
    children: customerRoutes,
  },
];

export { superAdminRoutes, customerRoutes, vendorRoutes };
