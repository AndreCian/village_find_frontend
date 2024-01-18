import clsx from 'clsx';

import { Input, Radio, RadioGroup, Select, TextField } from '@/components';

import styles from './PickupLocationCreate.module.scss';
import { TimeInput } from '@/components/forms/TimeInput/TimeInput';

export function PickupLocationCreate() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.control}>
          <p>Partnered pickup location name</p>
          <Select
            rounded="full"
            border="none"
            bgcolor="primary"
            placeholder="Partnered pickup location name"
            className={styles.select}
          />
        </div>
        <div className={styles.control}>
          <p>Partnered pickup location address</p>
          <Input
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Partnered pickup location address"
            className={styles.input}
          />
        </div>
        <div className={styles.inputWithButton}>
          <div className={styles.control}>
            <p>Special Event Fulfillment Date</p>
            <Input
              type="date"
              rounded="full"
              border="none"
              bgcolor="secondary"
              className={clsx(styles.input, styles.fit)}
            />
          </div>
          <button className={styles.button}>Add</button>
        </div>
        <div className={styles.pickup}>
          <div className={styles.control}>
            <p>Weekly pickup day</p>
            <Select
              rounded="full"
              border="none"
              bgcolor="primary"
              placeholder="Monday"
              className={styles.pickupDay}
            />
          </div>
          <div className={styles.control}>
            <p>Pickup window (from)</p>
            <div className={styles.pickupPicker}>
              <TimeInput />
            </div>
          </div>
          <div className={styles.control}>
            <p>Pickup window (to)</p>
            <div className={styles.pickupPicker}>
              <TimeInput />
            </div>
          </div>
        </div>
        <div className={styles.control}>
          <p>Special instructions (Sent in email to customer)</p>
          <TextField
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Special instructions (Sent in email to customer)"
            className={styles.input}
          />
        </div>
        <div className={styles.control}>
          <p>Delivery charge</p>
          <Input
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="00.00"
            className={styles.fit}
          />
        </div>
        <div className={styles.control}>
          <p>Active</p>
          <RadioGroup>
            <div className={clsx(styles.radioPanel, styles.activePanel)}>
              <Radio label="Yes" className={styles.radio} />
            </div>
            <div className={styles.radioPanel}>
              <Radio label="No" className={styles.radio} />
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button className={clsx(styles.button, styles.cancelButton)}>
          Cancel
        </button>
        <button className={styles.button}>Update</button>
      </div>
    </div>
  );
}
