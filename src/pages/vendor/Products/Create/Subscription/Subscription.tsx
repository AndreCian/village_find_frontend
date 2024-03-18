import clsx from 'clsx';

import { Input, Select } from '@/components';

import styles from './Subscription.module.scss';

export function Subscription() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.subForm}>
          <h2>Shipping Only</h2>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Subscription Frequency</p>
              <Select
                rounded="full"
                border="none"
                bgcolor="primary"
                placeholder="Weekly"
              />
            </div>
            <div className={styles.control}>
              <p>Subscription Discount</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                adornment={{ position: 'left', content: '$' }}
                placeholder="Subscription Discount"
              />
            </div>
          </div>
        </div>
        <div className={styles.subForm}>
          <h2>For local subscriptions only</h2>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Subscription Frequency</p>
              <Select
                rounded="full"
                border="none"
                bgcolor="primary"
                placeholder="Weekly"
              />
            </div>
            <div className={styles.control}>
              <p>Subscription Discount</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                adornment={{ position: 'left', content: '$' }}
                placeholder="Subscription Discount"
              />
            </div>
          </div>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Subscription Discount</p>
              <Input
                border="none"
                bgcolor="secondary"
                adornment={{ position: 'right', content: 'Weeks' }}
                placeholder="Number"
              />
            </div>
          </div>
          <p>Or</p>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>
                Start Date <span className={styles.optional}>(Optional)</span>
              </p>
              <Input
                type="date"
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="--/--/----"
              />
            </div>
            <div className={styles.control}>
              <p>End Date</p>
              <Input
                type="date"
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="--/--/----"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.button}>Cancel</button>
        <button className={clsx(styles.button, styles.updateBtn)}>
          Update
        </button>
      </div>
    </div>
  );
}
