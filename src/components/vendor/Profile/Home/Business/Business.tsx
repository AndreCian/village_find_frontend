import { useState } from 'react';

import { Card } from '@/components/common';
import { Input } from '@/components/forms';

import { IBusiness } from '@/pages/vendor/Profile/Home';

import styles from './Business.module.scss';

interface IBusinessProps {
  data: IBusiness;
  setData: (_: IBusiness) => void;
}

export function Business({ data, setData }: IBusinessProps) {
  const [business, setBusiness] = useState<IBusiness>(data);

  return (
    <Card title="Business Information" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.control}>
            <p>Business Name</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Business Name"
              disabled={true}
              value={business.name}
            />
          </div>
          <div className={styles.control}>
            <p>Phone Number</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Phone Number"
              disabled={true}
              value={business.phone}
            />
          </div>
          <div className={styles.control}>
            <p>Business Owner Name</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Business Owner Name"
              disabled={true}
              value={business.owner}
            />
          </div>
          <div className={styles.control}>
            <p>Business Address</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Business Address"
              disabled={true}
              value={business.address}
            />
          </div>
          <div className={styles.control}>
            <p>Business Name</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Email"
              disabled={true}
              value={business.email}
            />
          </div>
          <div className={styles.control}>
            <p>Business Zipcode</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Business Zipcode"
              disabled={true}
              value={business.zipcode}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
