import { Container } from '@/components/layout/customer';
import { Input, Select } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';
import { ProductCard } from '../../common';

import styles from './Products.module.scss';

const initialProducts = [
  {
    name: 'Gyuto Chef Knife',
    place: 'Forge2Table Knives',
    price: 10.93,
    image: '/assets/customer/products/product1.png',
  },
  {
    name: 'Mystery Awesome Box',
    place: 'Bills Boowls',
    price: 80.0,
    totprice: 160.0,
    image: '/assets/customer/products/product10.png',
    tags: ['Subscription'],
  },
  {
    name: 'Mystery Awesome Box',
    place: 'ToothyFoot',
    price: 4.89,
    image: '/assets/customer/products/product3.png',
    tags: ['Near You'],
  },
  {
    name: 'Mystery Awesome Box',
    place: 'Soaps & More',
    price: 22.98,
    image: '/assets/customer/products/product5.png',
    tags: ['Near You'],
  },
  {
    name: 'Gyuto Chef Knife',
    place: 'Forge2Table Knives',
    price: 10.93,
    image: '/assets/customer/products/product8.png',
  },
  {
    name: 'Mystery Awesome Box',
    place: 'Bills Boowls',
    price: 80.0,
    totprice: 160.0,
    image: '/assets/customer/products/product9.png',
  },
];

export function Products() {
  return (
    <Container className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <Select placeholder="All Products" />
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
        {initialProducts.map((product: any, index: number) => (
          <ProductCard key={`product-${index}`} product={product} />
        ))}
      </div>
    </Container>
  );
}
