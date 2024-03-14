import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { Card } from '@/components/common';
import { MagicIcon } from '@/components/icons';

import styles from './ProductLayout.module.scss';

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
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const buildPath = (childPath: string) => {
    return `${pathPrefix}/${productId}/${childPath}`;
  };

  const onNavItemClick = (item: INavItem) => {
    if (productId === 'create' && item.path !== 'general') {
      enqueueSnackbar('You should create product first.', {
        variant: 'warning',
      });
      navigate(buildPath('general'));
      return;
    }
    navigate(buildPath(item.path));
  };

  return (
    <div className={styles.root}>
      <div className={styles.leftBar}>
        {
          <Card className={styles.blog}>
            <div className={styles.container}>
              <span className={styles.magicPanel}>
                <MagicIcon className={styles.magicIcon} />
              </span>
              <div className={styles.desc}>
                <h2>Using AI</h2>
                <p>
                  If get stuck trying to create a product name or description,
                  let our AI do it for you!
                </p>
                <span>Learn More</span>
              </div>
            </div>
          </Card>
        }
        <Card className={styles.content}>
          <div className={styles.breadcrumb}>
            <p>My Products</p>
          </div>
          <Outlet />
        </Card>
      </div>
      <ul className={styles.rightBar}>
        {navItems.map((navItem: INavItem) => (
          <li
            key={navItem.title}
            className={clsx(
              styles.navItem,
              pathname === buildPath(navItem.path) ? styles.activeItem : '',
            )}
            onClick={() => onNavItemClick(navItem)}
          >
            {navItem.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
