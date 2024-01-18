import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import styles from './HomeLayout.module.scss';

const initialCommunity = {
  name: 'Field Of Artisans',
  logoUrl: '/assets/community/logo.png',
};

const initialNavItems = [
  {
    name: 'Dashboard',
    path: 'dashboard',
  },
  {
    name: 'Your Profile',
    path: 'profile',
  },
  {
    name: 'Your Earnings',
    path: 'earning',
  },
  {
    name: 'Announcement',
    path: 'announcement',
  },
];

export function HomeLayout() {
  const [community, setCommunity] = useState(initialCommunity);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  return (
    <div className={styles.root}>
      {pathname !== '/vendor-community' && (
        <div className={styles.sidebar}>
          <div className={styles.logo}>
            <img src={community.logoUrl} />
            <p>{community.name}</p>
          </div>
          <ul className={styles.navbar}>
            {initialNavItems.map((item: any, index: number) => (
              <li
                key={index}
                className={clsx(styles.navitem, {
                  [styles.active]: pathname.endsWith(item.path),
                })}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
