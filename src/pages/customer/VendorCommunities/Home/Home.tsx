import { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

import { Input, Select } from '@/components/forms';
import { Container } from '@/components/layout/customer';
import { VComCard } from '@/components/customer/common';

import { HttpService } from '@/services';

import styles from './Home.module.scss';

const initialCategories = [
  'All Categories',
  'Kitchenware',
  'Hand Cut',
  'Wood Working',
  'Stationary',
];

const initialCommunity = {
  backImage: '/assets/customer/vcom/back1.png',
  logoImage: '/assets/customer/backs/shopvcom.png',
  title: 'Wood Working Club',
  description: 'Over 600 artisans making unique one-of-a-kind items.',
  category: 'Wood Working',
};

export function Home() {
  const [category, setCategory] = useState('Wood Working');
  const [filter, setFilter] = useState('');
  const [communities, setCommunities] = useState([]);

  const onCategoryChange = (value: string) => {
    setCategory(value);
  };

  useEffect(() => {
    HttpService.get('/communities', {
      name: filter,
    }).then(response => {
      const result = response || [];
      setCommunities(result);
    });
  }, [filter]);

  return (
    <Container className={styles.root}>
      <div className={styles.dashboard}>
        <h2>Vendor Communities</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.head}>
          <h1>What is a vendor community?</h1>
          <p>
            Fresher Choice’s new C-commerce initiative empowers local people to
            organize small makers and growers in their communities to help them
            connect with customers looking for what they’re selling.
          </p>
        </div>
        <div className={styles.main}>
          <div className={styles.leftbar}>
            <p>Community Interest</p>
            <ul className={styles.categories}>
              {initialCategories.map((_category: string, index: number) => (
                <li
                  key={`category-${index}`}
                  onClick={() => setCategory(_category)}
                  className={category === _category ? styles.active : ''}
                >
                  <span />
                  <p>{_category}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.section}>
            <div className={styles.selectors}>
              <Select
                rounded="full"
                placeholder="Community Interest"
                options={initialCategories}
                border="none"
                bgcolor="primary"
                className={styles.interests}
                value={category}
                updateValue={onCategoryChange}
              />
              <Input
                size="large"
                rounded="full"
                placeholder="Search Communities or Community Interests"
                borderColor="primary"
                className={styles.search}
                adornment={{
                  position: 'right',
                  content: <FaMagnifyingGlass fill="white" />,
                }}
              />
            </div>
            <div className={styles.header}>
              <div className={styles.title}>
                <p>{category}</p>
                <span>{communities.length} Communities</span>
              </div>
              <Input
                rounded="full"
                placeholder="Search for a community"
                adornment={{
                  position: 'right',
                  content: <FaMagnifyingGlass fill="#652F90" />,
                }}
                className={styles.filterInput}
                value={filter}
                updateValue={(e: any) => setFilter(e.target.value)}
              />
            </div>
            <div className={styles.body}>
              {communities.map((community: any, index: number) => (
                <VComCard
                  key={`vendor-com-${index}`}
                  vcomId={community._id}
                  backImage={community.backImage || initialCommunity.backImage}
                  logoImage={community.logoImage || initialCommunity.logoImage}
                  title={community.villageName || initialCommunity.title}
                  description={
                    community.description || initialCommunity.description
                  }
                  vendors={community.vendors || 0}
                  category={community.category || initialCommunity.category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
