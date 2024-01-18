import { Input, Select, TextField } from '@/components/forms';
import styles from './AddressPanel.module.scss';

export function AddressPanel() {
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
          <Input placeholder="Full Name" className={styles.input} />
          <Input placeholder="Contact Number" className={styles.input} />
        </div>
        <Input placeholder="Email" className={styles.input} />
      </div>
      <div className={styles.section}>
        <p className={styles.text}>Delivery Details</p>
        <div className={styles.horizon}>
          <Input placeholder="Street Address" className={styles.input} />
          <Input
            placeholder="Extras: Appt #, Floor, Unit, Etc..."
            className={styles.input}
          />
        </div>
        <div className={styles.horizon}>
          <Input placeholder="City" className={styles.input} />
          <Input placeholder="State" className={styles.input} />
        </div>
        <div className={styles.horizon}>
          <Select placeholder="Country" className={styles.country} />
          <Input placeholder="Zipcode" className={styles.input} />
        </div>
        <TextField
          placeholder="Delivery Instructions"
          rows={3}
          className={styles.instruction}
        />
      </div>
    </div>
  );
}
