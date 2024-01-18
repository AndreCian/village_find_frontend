import { useContext } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';

import { Rater } from '@/components/common';
import { Button, TextField } from '@/components/forms';

import { AuthContext } from '@/providers';

import styles from './Complete.module.scss';

export function Complete() {
  const context = useContext(AuthContext);

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <p className={styles.title}>
          Thank you for your order, {context.userName}!
        </p>
        <p className={styles.text}>
          An order confirmation will be sent to your email. You can also click
          the link below to view your recent orders
        </p>
        <Button className={styles.orderBtn}>View Order</Button>
      </div>
      <div className={styles.body}>
        <p className={styles.title}>How was your experience?</p>
        <div className={styles.rate}>
          <p className={styles.text}>Rate Your Experience</p>
          <Rater rating={0} iconSize={50} />
        </div>
        <div className={styles.improve}>
          <p className={styles.text}>How can we improve?</p>
          <TextField rows={5} className={styles.message} />
        </div>
        <Button className={styles.submitBtn}>Submit</Button>
      </div>
      <div className={styles.footer}>
        <p className={styles.title}>Follow us!</p>
        <div className={styles.icons}>
          <span>
            <FaFacebookF fill="white" size={40} />
          </span>
          <span>
            <FaInstagram fill="white" size={40} />
          </span>
          <span>
            <FaYoutube fill="white" size={40} />
          </span>
        </div>
      </div>
    </div>
  );
}
