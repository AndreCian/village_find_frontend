import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Sidebar, Header } from '@/components/layout/other';

import { HttpService } from '@/services';

import { AuthContext } from '@/providers';

import { setupToken } from '@/utils';

import styles from './Layout.module.scss';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isVendor = location.pathname.startsWith('/vendor');

  const { isLogin, setIsLogin } = useContext(AuthContext);

  useEffect(() => {
    if (isLogin) return;
    const userRole = isVendor ? 'vendor' : 'admin';
    const tokenKey = `${userRole}_token`;
    const token = localStorage.getItem(tokenKey);
    if (token) {
      setupToken(token, userRole);
      HttpService.post(`/user/${userRole}/login`, {})
        .then(response => {
          const { status } = response;
          if (status === 200) {
            setIsLogin(true);
          } else {
            setupToken(null, userRole);
            navigate(userRole === 'vendor' ? '/login/vendor' : '');
          }
        })
        .catch(err => {
          setupToken(null, userRole);
          navigate(userRole === 'vendor' ? '/login/vendor' : '');
        });
    } else {
      navigate(userRole === 'vendor' ? '/login/vendor' : '');
    }
  }, []);

  return (
    <div className={styles.root}>
      <Sidebar />
      <div className={styles.container}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
