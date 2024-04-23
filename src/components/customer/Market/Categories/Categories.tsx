import { useContext, useRef } from 'react';

import { Input } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';
import { CategoryContext } from '@/providers';
import { ChangeInputEvent } from '@/interfaces';

import styles from './Categories.module.scss';
import { useOnClickOutside } from '@/utils';

export function Categories() {
  const { categories, filter, setFilter } = useContext(CategoryContext);
  const { isCategoryBar, toggleCategoryBar } = useContext(CategoryContext);

  const catRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(catRef, toggleCategoryBar, 'mousedown');

  return (
    <div className={styles.root} ref={catRef}>
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
          value={filter}
          updateValue={(e: ChangeInputEvent) => setFilter(e.target.value)}
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
