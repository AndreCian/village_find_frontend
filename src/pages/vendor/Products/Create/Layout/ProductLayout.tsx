import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import styles from './ProductLayout.module.scss';
import { useEffect } from 'react';

interface INavItem {
  title: string;
  path: string;
}

const pathPrefix = '/vendor/products';

const navItems: INavItem[] = [
  {
    title: 'General Information',
    path: 'general',
  },
  {
    title: 'Product Styles',
    path: 'style',
  },
  {
    title: 'Specifications',
    path: 'specifications',
  },
  {
    title: 'Customization',
    path: 'customziation',
  },
  {
    title: 'Subscription',
    path: 'subscription',
  },
];

export function ProductLayout() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const buildPath = (childPath: string) => {
    return `${pathPrefix}/${productId}/${childPath}`;
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <ul className={styles.rightBar}>
        {navItems.map((navItem: INavItem) => (
          <li
            key={navItem.title}
            className={clsx(
              styles.navItem,
              pathname === buildPath(navItem.path) ? styles.activeItem : '',
            )}
            onClick={() => navigate(buildPath(navItem.path))}
          >
            {navItem.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
