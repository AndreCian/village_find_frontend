import { Button, Select } from '@/components/forms';

import styles from './ShippingMode.module.scss';

interface IShippingModeProps {
  onNextStep: () => void;
}

export function ShippingMode({ onNextStep = () => {} }: IShippingModeProps) {
  return (
    <div className={styles.root}>
      <div className={styles.shippingMode}>
        <p className={styles.title}>Select Shipping Method</p>
        <Select placeholder="Select" className={styles.selector} />
      </div>
      <Button className={styles.nextBtn} onClick={onNextStep}>
        Next
      </Button>
    </div>
  );
}
