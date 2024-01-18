import { useNavigate } from 'react-router-dom';

import { Container } from '@/components/layout/community';

import styles from './Home.module.scss';

export function Home() {
  const navigate = useNavigate();

  return (
    <Container className={styles.root}>
      <div className={styles.dashboard}>
        <img src="/assets/community/dashboard.jpg" />
        <div className={styles.content}>
          <h1>Vendor Community Login</h1>
          <p>Click below to login to you vendor comunity dashboard</p>
          <button onClick={() => navigate('/vendor-community/auth/login')}>
            Login
          </button>
        </div>
      </div>
    </Container>
  );
}
