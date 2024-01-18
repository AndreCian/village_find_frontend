import { Card } from '@/components/common';

import styles from './ShippingService.module.scss';
import { Radio, RadioGroup } from '@/components';

export function ShippingService() {
  return (
    <Card title="Shipping Services" className={styles.root}>
      <div className={styles.container}>
        <p>
          Select all of the shipping services that apply to your business needs
        </p>
        <div className={styles.subservice}>
          <div className={styles.ups}>
            <div className={styles.subUps}>
              <h3>USPS</h3>
              <RadioGroup className={styles.radioGroup}>
                <Radio label="SPS - First Class Mail/Package" size="small" />
                <Radio
                  label="USPS - First Class Package International"
                  size="small"
                />
                <Radio
                  label="USPS - Media Mail, only for existing Shippo customers with grandfathered Media Mail option."
                  size="small"
                />
                <Radio label="USPS - Parcel Select" size="small" />
                <Radio label="USPS - Priority Mail" size="small" />
                <Radio label="USPS - Priority Mail Express" size="small" />
                <Radio
                  label="USPS - Priority Mail Express International"
                  size="small"
                />
                <Radio
                  label="USPS - Priority Mail International"
                  size="small"
                />
              </RadioGroup>
            </div>
            <div className={styles.subUps}>
              <h3>UPS</h3>
              <RadioGroup className={styles.radioGroup}>
                <Radio label="UPS - 2nd Day Air®" size="small" />
                <Radio label="UPS - 2nd Day Air® A.M." size="small" />
                <Radio label="UPS - 3 Day Select®" size="small" />
                <Radio label="UPS - Access Point™ Economy" size="small" />
                <Radio label="UPS - Expedited®" size="small" />
                <Radio label="UPS - Express 12:00" size="small" />
                <Radio label="UPS - Express Plus®" size="small" />
                <Radio label="UPS - Express®" size="small" />
                <Radio label="UPS - Express® Early" size="small" />
                <Radio label="UPS - Ground" size="small" />
                <Radio label="UPS - Mail Innovations (domestic)" size="small" />
                <Radio label="UPS - Next Day Air Saver®" size="small" />
                <Radio label="UPS - Next Day Air®" size="small" />
                <Radio label="UPS - Next Day Air® Early" size="small" />
                <Radio label="UPS - Saver®" size="small" />
                <Radio label="UPS - Standard℠" size="small" />
                <Radio label="UPS - Surepost" size="small" />
                <Radio label="UPS - Surepost Lightweight" size="small" />
                <Radio
                  label="UPS - SurePost® Bound Printed Matte"
                  size="small"
                />
                <Radio label="UPS - SurePost® Media" size="small" />
              </RadioGroup>
            </div>
          </div>
          <div className={styles.fedex}>
            <h3>FedEx</h3>
            <RadioGroup className={styles.radioGroup}>
              <Radio label="FedEx - FedEx 2Day®" size="small" />
              <Radio label="FedEx - FedEx 2Day® A.M." size="small" />
              <Radio label="FedEx - FedEx Express Saver®" size="small" />
              <Radio label="FedEx - FedEx First Freight" size="small" />
              <Radio label="FedEx - FedEx First Overnight®" size="small" />
              <Radio label="FedEx - FedEx Freight® Economy" size="small" />
              <Radio label="FedEx - FedEx Freight® Priority" size="small" />
              <Radio label="FedEx - FedEx Ground®" size="small" />
              <Radio label="FedEx - FedEx Home Delivery®" size="small" />
              <Radio
                label="FedEx - FedEx International Economy®"
                size="small"
              />
              <Radio
                label="FedEx - FedEx International Economy® Freight"
                size="small"
              />
              <Radio label="FedEx - FedEx International First®" size="small" />
              <Radio label="FedEx - FedEx International First®" size="small" />
              <Radio
                label="FedEx - FedEx International Priority®"
                size="small"
              />
              <Radio
                label="FedEx - FedEx International Priority® Freight"
                size="small"
              />
              <Radio label="FedEx - FedEx Next Day Freight" size="small" />
              <Radio label="FedEx - FedEx Priority Overnight®" size="small" />
              <Radio label="FedEx - FedEx SmartPost®" size="small" />
              <Radio label="FedEx - FedEx Standard Overnight®" size="small" />
            </RadioGroup>
          </div>
        </div>
      </div>
    </Card>
  );
}
