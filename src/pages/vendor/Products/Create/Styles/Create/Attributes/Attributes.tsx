import { FaChevronRight } from 'react-icons/fa6';

import { Card } from '@/components/common';

import styles from './Attributes.module.scss';

export function Attributes() {
  return (
    <Card className={styles.root}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <p>My Products</p>
          <FaChevronRight className={styles.arrow} />
          <p>Product Styles</p>
          <FaChevronRight className={styles.arrow} />
          <span>Attributes</span>
        </div>
      </div>
    </Card>
  );
}
