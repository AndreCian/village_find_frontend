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
  category: number;
  categories: string[];
  changeCategory: (_: number) => void;
  vendor: number;
  changeVendor: (_: number) => void;
}

export function CategoryBar({
  panel = true,
  category = -1,
  changeCategory = () => {},
  categories = [],
  vendor = -1,
  changeVendor = () => {},
}: ICategoryBarProps) {
  const onCategoryChange = (index: number) => {
    category === index ? changeCategory(-1) : changeCategory(index);
  };
  return (
    <div className={styles.root}>
      <div className={styles.categoryList}>
        <p>By Interest</p>
        <ul className={styles.categories}>
          {categories.map((_category: string, index: number) => (
            <li
              key={`interest-category-${index}`}
              onClick={() => onCategoryChange(index)}
              className={panel && category === index ? styles.active : ''}
            >
              <span />
              <p>{_category}</p>
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
