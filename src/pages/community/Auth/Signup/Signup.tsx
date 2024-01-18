import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { Input } from '@/components/forms';
import { Container } from '@/components/layout/community';

import { HttpService } from '@/services';

import styles from './Signup.module.scss';

interface IAccount {
  name: string;
  email: string;
  phone: string;
  code: string;
  password: string;
  confirm?: string;
}

const initialAccount: IAccount = {
  name: '',
  email: '',
  phone: '',
  code: '',
  password: '',
  confirm: '',
};

export function Signup() {
  const [account, setAccount] = useState<IAccount>(initialAccount);

  const onRegister = () => {
    if (account.password === account.confirm) {
      delete account.confirm;
      HttpService.post('/communities/register', account).then(response => {
        if (response) {
          enqueueSnackbar('Signup successfully!', { variant: 'success' });
          setAccount(initialAccount);
        }
      });
    }
  };

  const onAccountChange = (e: any) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className={styles.root}>
      <div className={styles.panel}>
        <h1>Register</h1>
        <div className={styles.horizon}>
          <Input
            name="name"
            placeholder="Community Name"
            className={styles.input}
            value={account.name}
            updateValue={onAccountChange}
          />
          <Input
            name="email"
            placeholder="Email"
            className={styles.input}
            value={account.email}
            updateValue={onAccountChange}
          />
        </div>
        <Input
          name="phone"
          type="number"
          placeholder="Phone"
          className={styles.input}
          value={account.phone}
          updateValue={onAccountChange}
        />
        <Input
          name="code"
          placeholder="Six Letter Code"
          className={styles.input}
          value={account.code}
          updateValue={onAccountChange}
        />
        <p>
          A Six letter code that the vendors can use to signup with your
          community.
        </p>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          className={styles.input}
          value={account.password}
          updateValue={onAccountChange}
        />
        <Input
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          className={styles.input}
          value={account.confirm}
          updateValue={onAccountChange}
        />
        <button onClick={onRegister}>Register</button>
      </div>
    </Container>
  );
}
