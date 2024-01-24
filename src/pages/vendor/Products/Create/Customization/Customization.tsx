import { FaChevronRight } from 'react-icons/fa6';
import clsx from 'clsx';

import { Card } from '@/components/common';
import { Input, Radio, TextField } from '@/components/forms';

import styles from './Customization.module.scss';

export function Customization() {
  const productName = 'Black Polish Radish';

  return (
    <Card className={styles.root}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <p>My Products</p>
          <FaChevronRight />
          <span>Customization</span>
        </div>
        <h1>
          <span>Products Name: </span>
          {productName}
        </h1>
        <div className={styles.form}>
          <div className={styles.control}>
            <p>Add Product Customization</p>
            <button className={styles.button}>
              <Radio label="Activate" className={styles.btnRadio} />
            </button>
          </div>
          <div className={styles.control}>
            <p>Share how to customize</p>
            <TextField
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Share how to customize"
            />
          </div>
          <div className={styles.control}>
            <p>Customization Fee</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Size fee option"
              adornment={{
                position: 'left',
                content: '$',
              }}
              className={styles.feeInput}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.button}>Cancel</button>
        <button className={clsx(styles.button, styles.updateBtn)}>
          Update
        </button>
      </div>
    </Card>
  );
}
