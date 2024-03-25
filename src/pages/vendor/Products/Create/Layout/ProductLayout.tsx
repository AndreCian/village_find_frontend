import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { Card } from '@/components/common';
import { MagicIcon } from '@/components/icons';

import styles from './ProductLayout.module.scss';
import { FaChevronRight } from 'react-icons/fa6';
import { HttpService } from '@/services';

interface INavItem {
  title: string;
  path: string;
  actions?: any;
}

const pathPrefix = '/vendor/products';

const navItems: INavItem[] = [
  {
    title: 'General Information',
    path: 'general',
  },
  {
    title: 'Product Styles',
    actions: {
      create: 'Add Style',
      attribute: 'Attributes',
    },
    path: 'style',
  },
  {
    title: 'Specifications',
    actions: {
      create: 'Add Specification',
    },
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

  const [subPath, subActionPath] = useMemo(() => {
    const trimPath = pathname.slice(pathPrefix.length);
    const segPaths = trimPath.split('/');
    return [segPaths[2] ?? '', segPaths[3] ?? ''];
  }, [pathname]);
  const [subPathTitle, subActionPathTitle] = useMemo(() => {
    const pathItem = navItems.find((item: INavItem) => item.path === subPath);
    return [
      pathItem?.title ?? '',
      (pathItem?.actions && pathItem.actions[subActionPath]) ?? '',
    ];
  }, [subPath, subActionPath]);
  const routeStep = useMemo(() => {
    return subActionPathTitle ? 'ACTION_ROUTE' : 'MAIN_ROUTE';
  }, [subPathTitle, subActionPathTitle]);

  const [productName, setProductName] = useState('');

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

  useEffect(() => {
    if (productId === 'create') return;
    HttpService.get(`/products/vendor/${productId}`).then(response => {
      const { status, product } = response;
      if (status === 200) {
        const { name } = product;
        setProductName(name || '');
      } else if (status === 404) {
        enqueueSnackbar('Product not found!', { variant: 'warning' });
        navigate(pathPrefix);
      }
    });
  }, [productId]);

  return (
    <div className={styles.root}>
      <div className={styles.leftBar}>
        {subPath === 'general' && (
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
        )}
        <Card className={styles.content}>
          <div className={styles.breadcrumb}>
            <p>My Products</p>
            {subPathTitle && (
              <>
                <FaChevronRight fontSize={14} />
                <p
                  className={clsx({
                    [styles.bold]: routeStep === 'MAIN_ROUTE',
                  })}
                >
                  {subPathTitle}
                </p>
              </>
            )}
            {subActionPathTitle && (
              <>
                <FaChevronRight fontSize={14} />
                <p
                  className={clsx({
                    [styles.bold]: routeStep === 'ACTION_ROUTE',
                  })}
                >
                  {subActionPathTitle}
                </p>
              </>
            )}
          </div>
          <p className={clsx(styles.productName, { hidden: !productName })}>
            <span>Product Name: </span>
            {productName}
          </p>
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
