import { Input } from '@/components/forms';

import styles from './Earning.module.scss';

export function Earning() {
  return (
    <div className={styles.root}>
      <h1>Your Earnings</h1>
      <div className={styles.content}>
        <Input placeholder="Vendor" className={styles.input} />
        <button className={styles.submit}>Submit</button>
        <button className={styles.reset}>Reset</button>
      </div>
    </div>
  );
}
