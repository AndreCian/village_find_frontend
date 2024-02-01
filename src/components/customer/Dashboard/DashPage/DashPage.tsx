import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@/components/layout/customer';
import { Input } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';

import { SERVER_URL } from '@/config/global';

import { SearchbarContext } from '@/providers';

import styles from './DashPage.module.scss';

export interface IDashPageProps {
  title: string;
  subtitle: string;
  images: string[];
}

export const initialDashPageData = {
  title: 'Shop directly from our growing community of vendors',
  subtitle:
    'Groups of small and local vendors growing together on a single marketplace.',
  images: ['assets/customer/backs/dashboard.png'],
};

export function DashPage({ title, subtitle, images }: IDashPageProps) {
  const navigate = useNavigate();

  const { isSearchbar } = useContext(SearchbarContext);

  const [search, setSearch] = useState('');

  const onSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const onSearchDown = (e: any) => {
    if (e.keyCode === 13) {
      navigate('/market');
    }
  };

  return (
    <div className={styles.root}>
      <img src={`${SERVER_URL}/${images[0]}`} className={styles.dashImage} />
      <div className={styles.grayLayer} />
      <Container className={styles.searchBar}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {isSearchbar && (
          <Input
            size="large"
            border="none"
            rounded="full"
            placeholder="Search for anything"
            className={styles.searchInput}
            adornment={{
              position: 'right',
              content: <MagnifierIcon />,
            }}
            value={search}
            updateValue={onSearchChange}
            onKeyDown={onSearchDown}
          />
        )}
      </Container>
    </div>
  );
}
