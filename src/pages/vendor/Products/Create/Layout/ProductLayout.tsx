import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import styles from './ProductLayout.module.scss';

interface INavItem {
  title: string;
  path: string;
}

const pathPrefix = '/vendor/products/create';

const navItems: INavItem[] = [
  {
    title: 'General Information',
    path: '/',
  },
  {
    title: 'Product Styles',
    path: '/style',
  },
  {
    title: 'Specifications',
    path: '/specifications',
  },
  {
    title: 'Customization',
    path: '/customziation',
  },
  {
    title: 'Subscription',
    path: '/subscription',
  },
];

export function ProductLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

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
              pathname === `${pathPrefix}${navItem.path}`
                ? styles.activeItem
                : '',
            )}
            onClick={() => navigate(`${pathPrefix}${navItem.path}`)}
          >
            {navItem.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
