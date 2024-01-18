import { Input } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';

import styles from './Categories.module.scss';

const initialCats = [
  'Kitchenware',
  'Jewelry',
  'Wedding',
  'Wood Working',
  'Metal Working',
  'Jewelry',
  'Wedding',
  'Wood Working',
  'Metal Working',
  'Wedding',
  'Wood Working',
];

export function Categories() {
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
        {initialCats.map((category: string, index: number) => (
          <li key={`category-${index}`}>
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
