import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Logo } from '..';

import { AuthContext } from '@/providers';

import styles from './Header.module.scss';

const homePath = '/village-community';

export function Header() {
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const onBtnClick = () => {
    if (pathname === homePath) {
      navigate('dashboard');
    } else {
      setIsLogin(false);
      navigate(homePath);
    }
  };

  return (
    <div
      className={clsx(styles.root, !isLogin ? styles.container : styles.fixed)}
    >
      <Logo />
      {isLogin ? (
        <button className={styles.button} onClick={onBtnClick}>
          {pathname === homePath ? 'Dashboard' : 'Logout'}
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={() => navigate('/village-community/auth/login')}
        >
          Login
        </button>
      )}
    </div>
  );
}
