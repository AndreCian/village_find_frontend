import { Card } from '@/components/common';
import { TextField } from '@/components/forms';

import styles from './Rewards.module.scss';

export function Rewards() {
  return (
    <Card title="Rewards" className={styles.root}>
      <p>
        Starting a business can be a challenge. Sometimes you need to set some
        goals AND rewards for your hard work and success. Below, create several
        rewards you'll give yourself when you meet your goals!
      </p>
      <div className={styles.form}>
        <div className={styles.control}>
          <p>Reward 1</p>
          <TextField
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Share your reward and what you need to do to achieve it!"
            className={styles.textField}
            rows={2}
          />
        </div>
        <div className={styles.control}>
          <p>Reward 2</p>
          <TextField
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Share your reward and what you need to do to achieve it!"
            className={styles.textField}
            rows={2}
          />
        </div>
        <div className={styles.control}>
          <p>Reward 3</p>
          <TextField
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Share your reward and what you need to do to achieve it!"
            className={styles.textField}
            rows={2}
          />
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.button}>Update</button>
      </div>
    </Card>
  );
}
