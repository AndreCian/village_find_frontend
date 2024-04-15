import { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Container } from '@/components/layout/customer';
import { Input, Select } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';
import { ProductCard } from '@/components/customer/common';
import { CategoryContext } from '@/providers';
import { HttpService } from '@/services';

import styles from './Products.module.scss';

export function Products() {
  const [searchParams] = useSearchParams();

  const { categories } = useContext(CategoryContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const type = searchParams.get('type') || '';
    const search = searchParams.get('search') || '';
    const params: any = { type: type === 'subscription' ? type : '', search };
    HttpService.get('/products/public', params).then(response => {
      setProducts(response);
    });
  }, [searchParams]);

  return (
    <Container className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <Select
            placeholder="All Products"
            options={categories.map(item => ({
              ...item,
              value: item.name.toLowerCase(),
            }))}
            value={category}
            updateValue={(value: string) => setCategory(value)}
          />
          <Select placeholder="Sort Alphabetically, A-Z" />
          <div className={styles.price}>
            <Input placeholder="$ Price Lowest" />
            <p>to</p>
            <Input placeholder="$ Price Highest" />
          </div>
        </div>
        <div className={styles.zipcode}>
          <p>Find items near you!</p>
          <Input
            placeholder="Enter Zipcode"
            adornment={{ position: 'right', content: <MagnifierIcon /> }}
          />
        </div>
      </div>
      <div className={styles.products}>
        {products.map((product: any, index: number) => (
          <ProductCard key={`product-${index}`} product={product} />
        ))}
      </div>
    </Container>
  );
}
