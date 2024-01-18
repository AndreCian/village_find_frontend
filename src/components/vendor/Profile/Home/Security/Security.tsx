import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import { Card } from '@/components/common';
import { Input } from '@/components/forms';

import styles from './Security.module.scss';

interface ICredential {
  password: string;
  confirm: string;
}

export interface ISecurity {
  className?: string;
}

const initialCredential: ICredential = {
  password: '',
  confirm: '',
};

export function Security({ className = '' }: ISecurity) {
  const [credential, setCredential] = useState<ICredential>(initialCredential);

  const onPassChange =
    (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setCredential({
        ...credential,
        [field]: e.target.value,
      });
    };

  const onPassUpdate = () => {
    // Todo Here...
  };

  return (
    <Card title="Security" className={clsx(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.control}>
            <p>Password</p>
            <Input
              type="password"
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Password"
              value={credential.password}
              updateValue={onPassChange('password')}
            />
          </div>
          <div className={styles.control}>
            <p>Confirm Password</p>
            <Input
              type="password"
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Confirm Password"
              value={credential.confirm}
              updateValue={onPassChange('confirm')}
            />
          </div>
        </div>
        <div className={styles.buttonBar}>
          <button onClick={onPassUpdate}>Update</button>
        </div>
      </div>
    </Card>
  );
}
