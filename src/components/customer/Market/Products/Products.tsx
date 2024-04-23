import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Container } from '@/components/layout/customer';
import { Input, Select } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';
import { ProductCard } from '@/components/customer/common';
import { CategoryContext } from '@/providers';
import { HttpService } from '@/services';
import { ChangeInputEvent } from '@/interfaces';

import styles from './Products.module.scss';

const sortOpts = [
  {
    name: 'Sort Alphabetically, A-Z',
    value: 'ascending',
  },
  {
    name: 'Sort Alphabetically, Z-A',
    value: 'descending',
  },
  {
    name: 'None',
    value: 'none',
  },
];

export function Products() {
  const [searchParams] = useSearchParams();

  const { categories } = useContext(CategoryContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortValue, setSortValue] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const type = searchParams.get('type') || '';
    const search = searchParams.get('search') || '';
    const params: any = {
      type: type === 'subscription' ? type : '',
      search,
    };
    if (category) params.category = category;
    if (sortValue !== 'none') params.sort = sortValue;
    if (minPrice) params.minPrice = Number(minPrice);
    if (maxPrice) params.maxPrice = Number(maxPrice);
    HttpService.get('/products/public', params).then(response => {
      setProducts(response);
    });
  }, [searchParams, category, sortValue, minPrice, maxPrice]);

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
          <Select
            placeholder="Sort Alphabetically, A-Z"
            options={sortOpts}
            value={sortValue}
            updateValue={(value: string) => setSortValue(value)}
          />
          <div className={styles.price}>
            <Input
              name="minPrice"
              type="number"
              placeholder="$ Price Lowest"
              value={minPrice}
              updateValue={(e: ChangeInputEvent) => setMinPrice(e.target.value)}
            />
            <p>to</p>
            <Input
              name="maxPrice"
              type="number"
              placeholder="$ Price Highest"
              value={maxPrice}
              updateValue={(e: ChangeInputEvent) => setMaxPrice(e.target.value)}
            />
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
