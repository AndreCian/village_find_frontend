import { useEffect, useState } from 'react';

import { Input, Select, TextField } from '@/components/forms';
import { ChangeInputEvent } from '@/interfaces';
import { http } from '@/services';

import styles from './AddressPanel.module.scss';

export interface IShipping {
  fullName: string;
  phone: string;
  email: string;
}

export interface IDelivery {
  street: string;
  extra: string;
  city: string;
  state: string;
  country: string;
  zipcode: number;
  instruction: string;
}

interface IAddressPanelProps {
  shipping: IShipping;
  delivery: IDelivery;
  setShipping: (_: IShipping) => void;
  setDelivery: (_: IDelivery) => void;
}

export function AddressPanel({
  shipping,
  delivery,
  setShipping,
  setDelivery,
}: IAddressPanelProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const onShippingChange = (e: ChangeInputEvent) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const onDeliveryChange = (e: ChangeInputEvent) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    http
      .get('https://countriesnow.space/api/v0.1/countries/capital')
      .then(response => response.data)
      .then(response => {
        const { error, data } = response;
        if (!error) {
          setCountries(data.map((item: { name: string }) => item.name));
        }
      });
  }, []);

  useEffect(() => {
    http
      .post('https://countriesnow.space/api/v0.1/countries/states', {
        country: delivery.country,
      })
      .then(response => response.data)
      .then(response => {
        const {
          err,
          data: { states },
        } = response;
        setStates(states);
      });
  }, [delivery.country]);

  return (
    <div className={styles.root}>
      <p className={styles.head}>Shipping & Delivery Address</p>
      <div className={styles.section}>
        <p className={styles.text}>Who's receiving this order?</p>
        <Select
          placeholder="Address Book"
          options={[]}
          className={styles.addressBook}
        />
        <div className={styles.horizon}>
          <Input
            name="fullName"
            placeholder="Full Name"
            className={styles.input}
            value={shipping.fullName}
            updateValue={onShippingChange}
          />
          <Input
            name="phone"
            placeholder="Contact Number"
            className={styles.input}
            value={shipping.phone}
            updateValue={onShippingChange}
          />
        </div>
        <Input
          name="email"
          placeholder="Email"
          className={styles.input}
          value={shipping.email}
          updateValue={onShippingChange}
        />
      </div>
      <div className={styles.section}>
        <p className={styles.text}>Delivery Details</p>
        <div className={styles.horizon}>
          <Input
            name="street"
            placeholder="Street Address"
            className={styles.input}
            value={delivery.street}
            updateValue={onDeliveryChange}
          />
          <Input
            name="extra"
            placeholder="Extras: Appt #, Floor, Unit, Etc..."
            className={styles.input}
            value={delivery.extra}
            updateValue={onDeliveryChange}
          />
        </div>
        <div className={styles.horizon}>
          <Input
            name="city"
            placeholder="City"
            className={styles.input}
            value={delivery.city}
            updateValue={onDeliveryChange}
          />
          <Input
            name="state"
            placeholder="State"
            className={styles.input}
            value={delivery.state}
            updateValue={onDeliveryChange}
          />
        </div>
        <div className={styles.horizon}>
          <Select
            placeholder="Country"
            className={styles.country}
            options={countries}
            value={delivery.country}
            updateValue={(country: string) =>
              setDelivery({ ...delivery, country })
            }
          />
          <Input
            name="zipcode"
            placeholder="Zipcode"
            className={styles.input}
            value={delivery.zipcode}
            updateValue={onDeliveryChange}
          />
        </div>
        <TextField
          name="instruction"
          placeholder="Delivery Instructions"
          rows={3}
          className={styles.instruction}
          value={delivery.instruction}
          updateValue={onDeliveryChange}
        />
      </div>
    </div>
  );
}
