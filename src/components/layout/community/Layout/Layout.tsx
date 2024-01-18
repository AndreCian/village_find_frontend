import { Outlet } from 'react-router-dom';

import { Header } from '..';

import styles from './Layout.module.scss';

export function Layout() {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
