import { useState } from 'react';

import { Input } from '@/components/forms';

import styles from './CategoryBar.module.scss';

const initialVendors = [
  'All Vendors',
  'Bills Birds',
  'The Foundry',
  'Walk with Purpose Hats',
  "Lilly's Jewels",
  'Pat Backs',
  "Bronson's Purpose",
  "Greg's Eggs",
  'Juan and Kan',
];

interface ICategoryBarProps {
  panel: boolean;
  category: string;
  categories: { name: string; value: string }[];
  changeCategory: (_: string) => void;
  vendor: number;
  changeVendor: (_: number) => void;
}

export function CategoryBar({
  panel = true,
  category = '',
  categories = [],
  changeCategory = () => {},
  vendor = -1,
  changeVendor = () => {},
}: ICategoryBarProps) {
  return (
    <div className={styles.root}>
      <div className={styles.categoryList}>
        <p>By Interest</p>
        <ul className={styles.categories}>
          {categories.map((_category: any, index: number) => (
            <li
              key={index}
              onClick={() => changeCategory(_category.value)}
              className={
                panel && category === _category.value ? styles.active : ''
              }
            >
              <span />
              <p>{_category.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.priceBar}>
        <p>By Price</p>
        <div className={styles.container}>
          <div className={styles.control}>
            <p>Min Price</p>
            <Input bgcolor="primary" />
          </div>
          <div className={styles.control}>
            <p>Max Price</p>
            <Input bgcolor="primary" />
          </div>
        </div>
      </div>
      <div className={styles.categoryList}>
        <p>By Vendor</p>
        <ul className={styles.categories}>
          {initialVendors.map((_vendor: string, index: number) => (
            <li
              key={`vendor-category-${index}`}
              onClick={() => changeVendor(index)}
              className={!panel && vendor === index ? styles.active : ''}
            >
              <span />
              <p>{_vendor}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
