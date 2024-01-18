import { Card } from '@/components';

import ShippoLogo from '/assets/vendor/backs/shippo.png';
import styles from './ShippingAccount.module.scss';

export function ShippingAccount() {
  return (
    <Card title="Create your Shippo Shipping Account" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <img src={ShippoLogo} />
          <button>Click Here</button>
        </div>
      </div>
    </Card>
  );
}
