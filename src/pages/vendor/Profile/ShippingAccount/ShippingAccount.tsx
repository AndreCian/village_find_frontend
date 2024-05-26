import { useEffect, useState } from 'react';

import { Card } from '@/components/common';
import { HttpService } from '@/services';

import ShippoLogo from '/assets/vendor/backs/shippo.png';
import styles from './ShippingAccount.module.scss';

export function ShippingAccount() {
  const [isShippoConnected, setIsShippoConnected] = useState(false);

  const onConnectClick = () => {
    HttpService.get('/user/vendor/shippo/on-board').then(response => {
      const { status, url } = response;
      if (status === 200) {
        const shippoUrl = url;
        const linkElement = document.createElement('a');
        linkElement.href = shippoUrl;
        linkElement.target = '_blank';
        linkElement.click();
        linkElement.remove();
      }
    });
  };

  useEffect(() => {
    HttpService.get('/user/vendor/shippo/check').then(response => {
      const { status, shippo } = response;
      if (status === 200) {
        setIsShippoConnected(true);
      }
    })
  }, [])

  return (
    <Card title="Create your Shippo Shipping Account" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.panel}>
          {isShippoConnected && <span>Shippo connected</span>}
          <img src={ShippoLogo} />
          <button onClick={onConnectClick}>Click Here</button>
        </div>
      </div>
    </Card>
  );
}
