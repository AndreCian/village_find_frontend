import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { Button, Input, Radio } from '@/components/forms';
import { Container } from '@/components/layout/customer';

import { HttpService } from '@/services';

import styles from './Signup.module.scss';

interface IAccount {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipcode: string;
  password: string;
  confirm: string;
}

const initialAccount = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  zipcode: '',
  password: '',
  confirm: '',
};

export function Signup() {
  const [account, setAccount] = useState<IAccount>(initialAccount);

  const onAccountChange = (e: any) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onSignupClick = () => {
    HttpService.post('/user/customer/register', account)
      .then(response => {
        if (response) {
          enqueueSnackbar('Signup successfully!', { variant: 'success' });
        }
      })
      .catch(err => {
        enqueueSnackbar('Signup failed!', { variant: 'error' });
      });
  };

  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        <h1>Sign Up!</h1>
        <p className={styles.subtitle}>Let's get to know</p>
        <div className={styles.form}>
          <Input
            name="firstName"
            size="large"
            border="solid"
            placeholder="First Name"
            borderColor="primary"
            className={styles.input}
            value={account.firstName}
            updateValue={onAccountChange}
          />
          <Input
            name="lastName"
            size="large"
            border="solid"
            placeholder="Last Name"
            borderColor="primary"
            className={styles.input}
            value={account.lastName}
            updateValue={onAccountChange}
          />
          <Input
            name="phone"
            size="large"
            border="solid"
            placeholder="Phone Number"
            borderColor="primary"
            className={styles.input}
            value={account.phone}
            updateValue={onAccountChange}
          />
          <Input
            type="email"
            name="email"
            size="large"
            border="solid"
            placeholder="Email"
            borderColor="primary"
            className={styles.input}
            value={account.email}
            updateValue={onAccountChange}
          />
          <Input
            name="zipcode"
            size="large"
            border="solid"
            placeholder="Zip Code"
            borderColor="primary"
            className={styles.input}
            value={account.zipcode}
            updateValue={onAccountChange}
          />
          <Input
            name="password"
            type="password"
            size="large"
            border="solid"
            placeholder="Create Password"
            borderColor="primary"
            className={styles.input}
            value={account.password}
            updateValue={onAccountChange}
          />
          <Input
            name="confirm"
            type="password"
            size="large"
            border="solid"
            placeholder="Confirm Password"
            borderColor="primary"
            className={styles.input}
            value={account.confirm}
            updateValue={onAccountChange}
          />
          <div className={styles.terms}>
            <h2>Terms And Conditions</h2>
          </div>
          <Radio
            label="I accept the terms and conditions"
            value="false"
            className={styles.agreeRadio}
          />
          <Button className={styles.signupBtn} onClick={onSignupClick}>
            Register
          </Button>
        </div>
      </Container>
    </div>
  );
}
