import { Input } from '@/components/forms';

import { useState } from 'react';

import styles from './Earning.module.scss';

export function Earning() {
  const [shop, setShop] = useState('');

  const onShopChange = (e: any) => {
    setShop(e.target.value);
  };

  const onResetClick = () => {
    setShop('');
  };

  return (
    <div className={styles.root}>
      <h1>Your Earnings</h1>
      <div className={styles.content}>
        <input placeholder="Vendor" value={shop} onChange={onShopChange} />
        <button className={styles.submit}>Submit</button>
        <button className={styles.reset} onClick={onResetClick}>
          Reset
        </button>
      </div>
    </div>
  );
}
