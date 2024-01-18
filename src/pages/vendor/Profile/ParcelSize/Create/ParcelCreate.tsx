import clsx from 'clsx';

import { Card } from '@/components/common';
import { Input, Select } from '@/components/forms';

import styles from './ParcelCreate.module.scss';

export function ParcelCreate() {
  return (
    <Card title="Add Parcel Size" className={styles.root}>
      <div className={styles.container}>
        <p>Product dimensions padded not packed</p>
        <div className={styles.control}>
          <p>Name</p>
          <Input
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Name"
          />
        </div>
        <div className={styles.horizon}>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Width</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Width"
              />
            </div>
            <div className={styles.control}>
              <p>Width</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Height"
              />
            </div>
          </div>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Length</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Length"
              />
            </div>
            <div className={styles.control}>
              <p>Thickness (mm)</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Thickness (mm)"
              />
            </div>
          </div>
        </div>
        <div className={styles.horizon}>
          <div className={styles.control}>
            <p>Empty Box Weight</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Empty Box Weight"
            />
          </div>
          <div className={styles.control}>
            <p>Max Weight</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Max Weight"
            />
          </div>
        </div>
        <div className={styles.horizon}>
          <div className={styles.control}>
            <p>Size Unit</p>
            <Select
              rounded="full"
              border="none"
              bgcolor="primary"
              placeholder="In"
            />
          </div>
          <div className={styles.control}>
            <p>Mass Unit</p>
            <Select
              rounded="full"
              border="none"
              bgcolor="primary"
              placeholder="Lbs"
            />
          </div>
        </div>
        <div className={styles.buttonBar}>
          <button className={clsx(styles.button, styles.cancel)}>Cancel</button>
          <button className={styles.button}>Update</button>
        </div>
      </div>
    </Card>
  );
}
