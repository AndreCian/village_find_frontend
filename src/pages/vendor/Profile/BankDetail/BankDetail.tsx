import { Card } from '@/components';

import styles from './BankDetail.module.scss';

export function BankDetail() {
  return (
    <Card title="Create your Stripe Account" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <p>stripe</p>
          <button>Click Here</button>
        </div>
      </div>
    </Card>
  );
}
