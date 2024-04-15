import { Card } from '@/components/common';
import { HttpService } from '@/services';

import ShippoLogo from '/assets/vendor/backs/shippo.png';
import styles from './ShippingAccount.module.scss';

export function ShippingAccount() {
  const onConnectClick = () => {
    HttpService.get('/user/vendor/shippo/on-board').then(response => {
      const shippoUrl = response;
      const linkElement = document.createElement('a');
      linkElement.href = shippoUrl;
      linkElement.target = '_blank';
      linkElement.click();
      linkElement.remove();
    });
  };

  return (
    <Card title="Create your Shippo Shipping Account" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <img src={ShippoLogo} />
          <button onClick={onConnectClick}>Click Here</button>
        </div>
      </div>
    </Card>
  );
}
