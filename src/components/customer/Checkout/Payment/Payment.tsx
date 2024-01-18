import { useState } from 'react';

import { Button, Input } from '@/components/forms';

import styles from './Payment.module.scss';
import { FaCheck } from 'react-icons/fa6';

interface IPayment {
  email: string;
  cardNumber: string;
  expireDate: string;
  verifyCode: string;
  cardName: string;
  country: string;
  zipcode: string;
  phoneNumber: string;
  isOneClick: boolean;
}

const initialPayment: IPayment = {
  email: '',
  cardNumber: '',
  expireDate: '',
  verifyCode: '',
  cardName: '',
  country: '',
  zipcode: '',
  phoneNumber: '',
  isOneClick: false,
};

interface IPaymentProps {
  onNextStep: () => void;
}

export function Payment({ onNextStep = () => {} }: IPaymentProps) {
  const [payment, setPayment] = useState<IPayment>(initialPayment);

  const onPaymentChange = (e: any) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const onOneClickChange = () => {
    setPayment({ ...payment, isOneClick: !payment.isOneClick });
  };

  return (
    <div className={styles.root}>
      <p className={styles.head}>Pay With Card</p>
      <div className={styles.body}>
        <div className={styles.element}>
          <p className={styles.title}>Email</p>
          <Input
            name="email"
            placeholder="Email"
            className={styles.input}
            value={payment.email}
            updateValue={onPaymentChange}
          />
        </div>
        <div className={styles.element}>
          <p className={styles.title}>Card Information</p>
          <div className={styles.vertics}>
            <Input
              name="cardNumber"
              placeholder="1234 1234 1234 1234"
              className={styles.input}
              value={payment.cardNumber}
              updateValue={onPaymentChange}
            />
            <div className={styles.vdivider} />
            <div className={styles.horizon}>
              <Input
                name="expireDate"
                placeholder="MM/YY"
                className={styles.input}
                value={payment.expireDate}
                updateValue={onPaymentChange}
              />
              <div className={styles.hdivider} />
              <Input
                name="verifyCode"
                placeholder="CVC"
                className={styles.input}
                value={payment.verifyCode}
                updateValue={onPaymentChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.element}>
          <p className={styles.title}>Cardholder Name</p>
          <Input
            name="cardName"
            placeholder="Full Name on Card"
            className={styles.input}
            value={payment.cardName}
            updateValue={onPaymentChange}
          />
        </div>
        <div className={styles.element}>
          <p className={styles.title}>Country or Region</p>
          <div className={styles.vertics}>
            <Input
              name="country"
              placeholder="United States"
              className={styles.input}
              value={payment.country}
              updateValue={onPaymentChange}
            />
            <div className={styles.vdivider} />
            <Input
              name="zipcode"
              placeholder="ZIP"
              className={styles.input}
              value={payment.zipcode}
              updateValue={onPaymentChange}
            />
          </div>
        </div>
        <div className={styles.element}>
          <p className={styles.title}>Country or Region</p>
          <div className={styles.vertics}>
            <div className={styles.saveLink}>
              <div className={styles.checkPanel} onClick={onOneClickChange}>
                <span>{payment.isOneClick && <FaCheck size={12} />}</span>
                <p className={styles.label}>
                  Save my info for 1-click checkout with Link
                </p>
              </div>
              <p className={styles.statement}>
                Securely pay on Stripe Docs Demos and everywhere Link is
                accepted
              </p>
            </div>
            <div className={styles.vdivider} />
            <Input
              name="phoneNumber"
              placeholder="(201) 555-0123"
              className={styles.input}
              value={payment.phoneNumber}
              updateValue={onPaymentChange}
            />
          </div>
        </div>
      </div>
      <Button className={styles.payBtn} onClick={onNextStep}>
        Pay
      </Button>
    </div>
  );
}
