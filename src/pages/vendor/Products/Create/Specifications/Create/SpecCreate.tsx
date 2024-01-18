import clsx from 'clsx';
import { FaChevronRight } from 'react-icons/fa6';

import { Card, Select, TextField } from '@/components';

import styles from './SpecCreate.module.scss';

const specs = [
  'SKU',
  'UPC',
  'Weight',
  'Height',
  'Width',
  'Length',
  'Package Quantity',
];

export function SpecCreate() {
  const productName = 'Black Polish Radish';

  return (
    <Card className={styles.root}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <p>My Products</p>
          <FaChevronRight />
          <p>Specifications</p>
          <FaChevronRight />
          <span>Subscription</span>
        </div>
        <div className={styles.header}>
          <h1>
            <span>Products Name: </span>
            {productName}
          </h1>
          <button className={styles.button}>New</button>
        </div>
        <div className={styles.form}>
          <div className={styles.control}>
            <p>Add Specification</p>
            <Select
              rounded="full"
              border="none"
              bgcolor="primary"
              placeholder="SKU"
              options={specs}
            />
          </div>
          <div className={styles.values}>
            <TextField
              rows={1}
              rounded="full"
              border="none"
              bgcolor="primary"
              placeholder="Enter Specification Values"
            />
          </div>
        </div>
        <div className={styles.buttonBar}>
          <button className={styles.button}>Cancel</button>
          <button className={clsx(styles.button, styles.updateBtn)}>
            Update
          </button>
        </div>
      </div>
    </Card>
  );
}
