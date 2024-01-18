import { useContext, useState } from 'react';
import clsx from 'clsx';

import { Container } from '@/components/layout/customer';

import {
  AuthPanel,
  MyCart,
  OrderSummary,
  Payment,
  ShippingMode,
  Complete,
} from '@/components/customer/Checkout';

import { AuthContext } from '@/providers';

import styles from './Checkout.module.scss';

export function Checkout() {
  const context = useContext(AuthContext);
  const [step, setStep] = useState(0);

  const onNextStep = () => {
    setStep(step + 1);
  };

  return (
    <Container
      className={clsx(styles.root, { [styles.fullWidth]: step === 3 })}
    >
      <div className={styles.contentPanel}>
        {step !== 3 && <AuthPanel isLogin={context.isLogin} />}
        {step === 0 ? (
          <MyCart isLogin={context.isLogin} onNextStep={onNextStep} />
        ) : step === 1 ? (
          <ShippingMode onNextStep={onNextStep} />
        ) : step === 2 ? (
          <Payment onNextStep={onNextStep} />
        ) : (
          <Complete />
        )}
      </div>
      {step !== 3 && (
        <div className={styles.summary}>
          <OrderSummary />
        </div>
      )}
    </Container>
  );
}
