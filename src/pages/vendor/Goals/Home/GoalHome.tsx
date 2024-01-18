import clsx from 'clsx';

import { Card } from '@/components/common';
import { Input, TextField } from '@/components/forms';

import styles from './GoalHome.module.scss';

export function GoalHome() {
  return (
    <Card title="Goals" className={styles.root}>
      <div className={styles.form}>
        <div className={styles.control}>
          <p>Why did you start your business?</p>
          <TextField
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Share how to customize"
            className={styles.textField}
          />
        </div>
        <div className={styles.control}>
          <p>Your Personal Business Goal</p>
          <TextField
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Share how to customize"
            className={styles.textField}
          />
        </div>
        <div className={styles.control}>
          <p>Your Yearly Revenue Goal</p>
          <Input
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Revenue Goal"
            adornment={{
              position: 'left',
              content: '$',
            }}
            className={styles.revInput}
          />
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.button}>Cancel</button>
        <button className={clsx(styles.button, styles.updateBtn)}>
          Update
        </button>
      </div>
    </Card>
  );
}
