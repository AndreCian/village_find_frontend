import { useContext, useState } from 'react';
import clsx from 'clsx';

import { Button, Input } from '@/components/forms';

import { AuthContext } from '@/providers';

import styles from './AuthPanel.module.scss';

interface IAuthPanelProps {
  isLogin: boolean;
}

export function AuthPanel({ isLogin }: IAuthPanelProps) {
  const context = useContext(AuthContext);
  const [isLoginPanel, setIsLoginPanel] = useState(false);

  return isLogin ? (
    <div className={styles.home}>
      <p>Hi, Brandon!</p>
    </div>
  ) : (
    <div className={styles.auth}>
      {isLoginPanel ? (
        <div className={styles.loginPanel}>
          <p className={styles.title}>Login</p>
          <div className={styles.inputs}>
            <Input
              className={clsx(styles.input, styles.email)}
              placeholder="Email/Phone Number"
            />
            <Input
              className={clsx(styles.input, styles.password)}
              placeholder="Password"
            />
          </div>
          <div className={styles.buttons}>
            <Button
              className={clsx(styles.button, styles.cancel)}
              onClick={() => setIsLoginPanel(false)}
            >
              Cancel
            </Button>
            <Button className={clsx(styles.button, styles.Login)}>Login</Button>
          </div>
        </div>
      ) : (
        <div className={styles.infoPanel}>
          <div className={styles.text}>
            <p className={styles.title}>Login or Signup</p>
            <p className={styles.body}>
              Login or signup to order these <span>uniquely made or grown</span>{' '}
              items below
            </p>
          </div>
          <div className={styles.buttons}>
            <Button
              className={clsx(styles.button, styles.login)}
              onClick={() => setIsLoginPanel(true)}
            >
              Login
            </Button>
            <Button className={clsx(styles.button, styles.signup)}>
              Sign up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
