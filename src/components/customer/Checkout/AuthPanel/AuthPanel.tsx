import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { Button, Input } from '@/components/forms';
import { AuthContext } from '@/providers';
import { useAppSelector } from '@/redux/store';
import { HttpService } from '@/services';
import { setupToken } from '@/utils';
import { ChangeInputEvent } from '@/interfaces';

import styles from './AuthPanel.module.scss';

interface IAuthPanelProps {
  isLogin: boolean;
}

interface ILoginAccount {
  email: string;
  password: string;
}

interface IRegisterAccount {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const initialLoginAccount: ILoginAccount = {
  email: '',
  password: ''
}

const initialRegisterAccount: IRegisterAccount = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: ''
}

export function AuthPanel({ isLogin }: IAuthPanelProps) {
  const guestId = useAppSelector(state => state.guest.guestID);

  const { account, setAccount, setIsLogin } = useContext(AuthContext);
  const [authPanel, setAuthPanel] = useState('');
  const [loginAccount, setLoginAccount] = useState<ILoginAccount>(initialLoginAccount);
  const [registerAccount, setRegisterAccount] = useState<IRegisterAccount>(initialRegisterAccount);

  const onLoginAccountChange = (e: ChangeInputEvent) => {
    setLoginAccount({
      ...loginAccount,
      [e.target.name]: e.target.value
    });
  }

  const onRegisterAccountChange = (e: ChangeInputEvent) => {
    setRegisterAccount({
      ...registerAccount,
      [e.target.name]: e.target.value
    });
  }

  const onLoginClick = () => {
    HttpService.post(`/user/customer/login`, loginAccount)
      .then(response => {
        const { status, token, profile } = response;
        if (status === 200) {
          setupToken(token, 'customer');

          HttpService.post(`/cart/migrate`, { guestId }).then(response => {
            const { status } = response;
            if (status === 200) {
              setIsLogin(true);
              setAccount({
                role: 'customer',
                profile,
              });
              enqueueSnackbar('Login successfully!', { variant: 'success' });
            }
          });
        } else if (status === 400) {
          enqueueSnackbar('Invalid credentials!', { variant: 'error' });
        } else if (status === 404) {
          enqueueSnackbar('Email does not exist!', { variant: 'error' });
        } else {
          enqueueSnackbar('Something went wrong with server.', {
            variant: 'error',
          });
        }
      })
      .catch(err => {
        enqueueSnackbar('Something went wrong with server.', {
          variant: 'error',
        });
      });
    // HttpService.post('/user/customer', authAccount).then(response => {

    // })
  }

  const onSignupClick = () => {
    HttpService.post(`/user/customer/register`, registerAccount)
      .then(response => {
        const { status, token, profile } = response;
        if (status === 200) {
          setupToken(token, 'customer');

          HttpService.post(`/cart/migrate`, { guestId }).then(response => {
            const { status } = response;
            if (status === 200) {
              setIsLogin(true);
              setAccount({
                role: 'customer',
                profile,
              });
              enqueueSnackbar('Signup successfully!', { variant: 'success' });
            }
          });
        } else if (status === 400) {
          enqueueSnackbar('Invalid credentials!', { variant: 'error' });
        } else if (status === 404) {
          enqueueSnackbar('Email does not exist!', { variant: 'error' });
        } else {
          enqueueSnackbar('Something went wrong with server.', {
            variant: 'error',
          });
        }
      })
      .catch(err => {
        enqueueSnackbar('Something went wrong with server.', {
          variant: 'error',
        });
      });
  }

  return isLogin ? (
    <div className={styles.home}>
      <p>Hi, {account?.profile.firstName}!</p>
    </div>
  ) : (
    <div className={styles.auth}>
      {authPanel === 'login' ? (
        <div className={styles.loginPanel}>
          <p className={styles.title}>Login</p>
          <div className={styles.inputs}>
            <Input
              name='email'
              className={clsx(styles.input, styles.email)}
              placeholder="Email/Phone Number"
              value={loginAccount.email}
              updateValue={onLoginAccountChange}
            />
            <Input
              name='password'
              type='password'
              className={clsx(styles.input, styles.password)}
              placeholder="Password"
              value={loginAccount.password}
              updateValue={onLoginAccountChange}
            />
          </div>
          <div className={styles.buttons}>
            <Button
              className={clsx(styles.button, styles.cancel)}
              onClick={() => setAuthPanel('')}
            >
              Cancel
            </Button>
            <Button className={clsx(styles.button, styles.Login)} onClick={onLoginClick}>Login</Button>
          </div>
        </div>
      ) :
        authPanel === 'signup' ?
          (
            <div className={styles.loginPanel}>
              <p className={styles.title}>Signup</p>
              <div className={styles.inputs}>
                <div className={styles.control}>
                  <Input
                    name='firstName'
                    className={clsx(styles.input)}
                    placeholder="First Name"
                    value={registerAccount.firstName}
                    updateValue={onRegisterAccountChange}
                  />
                  <Input
                    name='lastName'
                    className={clsx(styles.input)}
                    placeholder="Last Name"
                    value={registerAccount.lastName}
                    updateValue={onRegisterAccountChange}
                  />
                </div>
                <div className={styles.control}>
                  <Input
                    name='email'
                    className={clsx(styles.input)}
                    placeholder="Email"
                    value={registerAccount.email}
                    updateValue={onRegisterAccountChange}
                  />
                  <Input
                    name='phone'
                    className={clsx(styles.input)}
                    placeholder="Phone Number"
                    value={registerAccount.phone}
                    updateValue={onRegisterAccountChange}
                  />
                </div>
                <Input
                  name='password'
                  type='password'
                  className={clsx(styles.input, styles.password)}
                  placeholder="Password"
                  value={registerAccount.password}
                  updateValue={onRegisterAccountChange}
                />
              </div>
              <div className={styles.buttons}>
                <Button
                  className={clsx(styles.button, styles.cancel)}
                  onClick={() => setAuthPanel('')}
                >
                  Cancel
                </Button>
                <Button className={clsx(styles.button, styles.Login)} onClick={onSignupClick}>Signup</Button>
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
                  onClick={() => setAuthPanel('login')}
                >
                  Login
                </Button>
                <Button className={clsx(styles.button, styles.signup)}
                  onClick={() => setAuthPanel('signup')}>
                  Sign up
                </Button>
              </div>
            </div>
          )}
    </div>
  );
}
