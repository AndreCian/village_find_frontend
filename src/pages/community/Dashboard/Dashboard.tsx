import { useContext } from 'react';

import { Card } from '@/components/common';

import { AuthContext } from '@/providers';

import styles from './Dashboard.module.scss';

export function Dashboard() {
  const { account } = useContext(AuthContext);

  return (
    <div className={styles.root}>
      <h1>Dashboard</h1>
      <Card className={styles.card}>
        <p className={styles.share}>
          Share Your Community Code{' '}
          <span>{account && account.profile && account.profile.code}</span> with
          vendors.
        </p>
        <div className={styles.text}>
          <p className={styles.earning}>Monthly Earnings</p>
          <p className={styles.vendors}>Your Vendors</p>
          <p>
            Vendors who use your community code for signup will be displayed in
            this area.
          </p>
        </div>
      </Card>
    </div>
  );
}
