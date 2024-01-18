import React, { ChangeEvent, useState } from 'react';

import { Card, Input, Select } from '@/components';
import { ISubscription } from '../Subscription';

import styles from './NewSubscription.module.scss';

const initialSubsc: ISubscription = {
  name: '',
  title: '',
  status: 'Active',
};

export function NewSubscription() {
  const [subscription, setSubsc] = useState<ISubscription>(initialSubsc);

  const updateSubscName = (e: ChangeEvent<HTMLInputElement>) => {
    setSubsc({ ...subscription, name: e.target.value });
  };

  const updateSubscStatus = (status: any) => {
    setSubsc({ ...subscription, status });
  };

  return (
    <Card title="New Subscription" className={styles.root}>
      <div className={styles.form}>
        <div className={styles.control}>
          <p>Subscription Name</p>
          <Input
            value={subscription.name}
            updateValue={updateSubscName}
            placeholder="Metric Name"
          />
        </div>
        <div className={styles.control}>
          <p>Status</p>
          <Select
            value={subscription.status}
            updateValue={updateSubscStatus}
            placeholder="Status"
          />
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.cancelButton}>Cancel</button>
        <button className={styles.addButton}>Add</button>
      </div>
    </Card>
  );
}
