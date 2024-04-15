import { useContext } from 'react';

import { Input } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';
import { CategoryContext } from '@/providers';

import styles from './Categories.module.scss';

export function Categories() {
  const { categories } = useContext(CategoryContext);

  return (
    <div className={styles.root}>
      <div className={styles.categorybar}>
        <p className={styles.head}>All Categories</p>
        <Input
          rounded="full"
          placeholder="Search Categories"
          className={styles.catInput}
          adornment={{
            position: 'right',
            content: <MagnifierIcon />,
          }}
        />
      </div>
      <ul className={styles.categories}>
        {categories.map((category: any, index: number) => (
          <li key={`category-${index}`}>
            <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
