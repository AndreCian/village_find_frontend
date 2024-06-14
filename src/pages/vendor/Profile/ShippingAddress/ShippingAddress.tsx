import { ChangeEvent, useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { Card } from '@/components/common';
import { Button, Input, Select } from '@/components/forms';
import { HttpService } from '@/services';
import { usStates } from '@/providers';
import styles from './ShippingAddress.module.scss';

type IAddress = {
  street1: string;
  city: string;
  state: string;
  zip: string;
}

const initialAddress: IAddress = {
  street1: '',
  city: '',
  state: '',
  zip: ''
}

export function ShippingAddress() {
  const [address, setAddress] = useState<IAddress>(initialAddress);

  const onAddrChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const onCancelClick = () => {
  }

  const onUpdateClick = () => {
    HttpService.put('/user/vendor/profile/shipping/address', { ...address, country: 'US' }).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('Shipping address updated.', { variant: 'success' });
      }
    });
  }

  useEffect(() => {
    HttpService.get('/user/vendor/profile/shipping/address')
      .then(response => {
        const { address } = response;
        setAddress(address || initialAddress);
      })
  }, []);

  return (
    <Card title="Shipping Address" className={styles.root}>
      <div className={styles.container}>
        <p>
          This address will be used to calculate shipping costs for customers.
        </p>
        <div className={styles.control}>
          <p>Address</p>
          <Input
            name='street1'
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Address"
            value={address.street1}
            updateValue={onAddrChange}
          />
        </div>
        <div className={styles.horizon}>
          <div className={styles.control}>
            <p>City</p>
            <Input
              name='city'
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="City"
              value={address.city}
              updateValue={onAddrChange}
            />
          </div>
          <div className={styles.control}>
            <p>State</p>
            <Select
              value={address.state}
              options={usStates.map(item => ({ name: item.name, value: item.code }))}
              rounded="full"
              border="none"
              bgcolor="primary"
              placeholder="State"
              updateValue={value => setAddress({ ...address, state: value })}
            />
          </div>
          <div className={styles.control}>
            <p>Zipcode</p>
            <Input
              name='zip'
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Zipcode"
              value={address.zip}
              updateValue={onAddrChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.cancel} onClick={onCancelClick}>Cancel</Button>
        <Button className={styles.update} onClick={onUpdateClick}>Update</Button>
      </div>
    </Card>
  );
}
