import { Container } from '@/components/layout/customer';
import { ProductCard } from '../../common';

import styles from './AsortCategories.module.scss';

const initialCategories = [
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

export function AsortCategories() {
  return (
    <Container className={styles.root}>
      <p className={styles.head}>Assorted Categories</p>
      <div className={styles.categories}>
        {initialCategories.map((category: any, index: number) => (
          <ProductCard key={`asorted-category-${index}`} product={category} />
        ))}
      </div>
    </Container>
  );
}
