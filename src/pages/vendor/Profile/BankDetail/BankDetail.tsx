import { Card } from '@/components';

import styles from './BankDetail.module.scss';
import StripeLogo from '/assets/customer/logos/stripe.png';

import { HttpService } from '@/services';

export function BankDetail() {
  const onConnectClick = () => {
    HttpService.get('/user/vendor/stripe/on-board').then(response => {
      const { url, status } = response;
      if (status === 200) {
        const stripeLink = document.createElement('a');
        stripeLink.href = url;
        stripeLink.target = '_blank';
        document.body.append(stripeLink);
        stripeLink.click();
        stripeLink.remove();
      }
    });
  };

  return (
    <Card title="Create your Stripe Account" className={styles.root}>
      <p>
        Village Finds partners with Stripe, the leading payments gateway which
        provides secure and simple direct deposits for your business. In-order
        to launch your store and receive direct deposits, you will need to
        connect your store to Stripe.
      </p>
      <div className={styles.container}>
        <div className={styles.instruction}>
          <div className={styles.step}>
            <h3>Step 1</h3>
            <p className={styles.subHeading}>Connect to Stripe</p>
            <p>Setup your Stripe account by clicking the button "Click Here"</p>
          </div>
          <div className={styles.step}>
            <h3>Step 2</h3>
            <p className={styles.subHeading}>Follow the steps</p>
            <p>
              You will be taken to a new window on the Stripe website where you
              will add all information required by Stripe. This is a multistep
              process.
            </p>
          </div>
          <div className={styles.step}>
            <h3>Step 3</h3>
            <p className={styles.subHeading}>Completion</p>
            <p>
              Once you have completed the steps, you will be taken back to your
              Village Finds dashboard. You will now receive direct deposits to
              your bank account.
            </p>
          </div>
        </div>
        <div className={styles.panel}>
          <img src={StripeLogo} alt="Stripe Logo" />
          <p>Click the button to connect your store to Stripe.</p>
          <button onClick={onConnectClick}>Click Here</button>
        </div>
      </div>
    </Card>
  );
}
