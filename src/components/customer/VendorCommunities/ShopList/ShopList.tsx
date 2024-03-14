import { VendorCard } from '@/components/customer/common';

import styles from './ShopList.module.scss';

interface IShopListProps {
  shops: any[];
}

function ShopList({ shops }: IShopListProps) {
  return (
    <div className={styles.vendors}>
      {shops.map((vendor: any, index: number) => (
        <VendorCard key={`vendor-${index}`} {...vendor} />
      ))}
    </div>
  );
}

export { ShopList };
