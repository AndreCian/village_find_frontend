import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Input } from '@/components/forms';
import { Container } from '@/components/layout/customer';

import styles from './Login.module.scss';
import LoginImage from '/assets/customer/backs/login.png';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const onNavItemClick = (path: string) => () => {
    navigate(path);
  };

  const onRoleClick = (role: string) => () => {
    navigate(`/login/${role}`);
  };

  const onSignupClick = () => {
    const role = pathname.slice('/login/'.length);
    navigate(`/sign-up/${role}`);
  };

  return (
    <div className={styles.root}>
      <ul className={styles.subNavbar}>
        {['Customer', 'Vendor'].map((role: string) => (
          <li
            key={role}
            className={clsx(
              styles.navItem,
              pathname === `/login/${role.toLowerCase()}`
                ? styles.activeItem
                : '',
            )}
            onClick={onNavItemClick(`/login/${role.toLowerCase()}`)}
          >
            {role} Sign in
          </li>
        ))}
      </ul>
      <div className={styles.loginBody}>
        <img src={LoginImage} />
        <Container className={styles.container}>
          <div className={styles.form}>
            <ul className={styles.navlink}>
              {['Customer', 'Vendor'].map((role: string) => (
                <li
                  key={role}
                  onClick={onRoleClick(role.toLowerCase())}
                  className={
                    pathname === `/login/${role.toLowerCase()}`
                      ? styles.active
                      : ''
                  }
                >
                  {role} Sign in
                </li>
              ))}
            </ul>
            <div className={styles.control}>
              <Input
                rounded="small"
                border="none"
                size="large"
                placeholder="Email/Phone Number"
                className={styles.input}
              />
              <Input
                type="password"
                rounded="small"
                border="none"
                size="large"
                placeholder="Password"
                className={styles.input}
              />
            </div>
            <span>Forgot password?</span>
            <Button className={styles.loginButton}>Login</Button>
            <p className={styles.signupLink}>
              Don't have an account?<span onClick={onSignupClick}>Sign up</span>
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
