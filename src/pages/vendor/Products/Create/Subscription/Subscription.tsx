import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { Input, Select } from '@/components';
import { HttpService } from '@/services';

import styles from './Subscription.module.scss';
import { enqueueSnackbar } from 'notistack';
import { ChangeInputEvent } from '@/interfaces';

interface ISubscription {
  frequency: string;
  discount: number;
  duration?: number;
  startDate?: string;
  endDate?: string;
}

const initialSubscription: ISubscription = {
  frequency: '',
  discount: 0,
  duration: 0,
  startDate: '',
  endDate: '',
};

const freqOpts = [
  'Weekly',
  'Every month',
  'Every 2 months',
  'Every 3 months',
  'Every 6 months',
];

const subPath = '/vendor/products';

export function Subscription() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [subscription, setSubscription] =
    useState<ISubscription>(initialSubscription);
  const [deliveryTypes, setDeliveryTypes] = useState<string[]>([]);

  const onCancelClick = () => {
    navigate(`${subPath}`);
  };

  const onSubscInputChange = (e: ChangeInputEvent) => {
    setSubscription({ ...subscription, [e.target.name]: e.target.value });
  };

  const onSubscFrequencyChange = (value: string) => {
    setSubscription({ ...subscription, frequency: value });
  };

  const onUpdateClick = () => {
    const reqJson: ISubscription = {
      frequency: subscription.frequency,
      discount: subscription.discount,
    };
    if (deliveryTypes.includes('Local Subscriptions')) {
      reqJson.duration = subscription.duration;
      reqJson.startDate = subscription.startDate;
      reqJson.endDate = subscription.endDate;
    }
    HttpService.post(`/products/${productId}/subscription`, reqJson).then(
      response => {
        const { status } = response;

        if (status === 200) {
          enqueueSnackbar('Subscription updated.', { variant: 'success' });
        } else {
          enqueueSnackbar('Something went wrong!', { variant: 'error' });
        }
      },
    );
  };

  useEffect(() => {
    HttpService.get(`/products/vendor/${productId}`).then(response => {
      const { status, product } = response;

      if (status === 200) {
        setDeliveryTypes(product.deliveryTypes || []);
        setSubscription(product.subscription || initialSubscription);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.subForm}>
          <h2>Shipping Only</h2>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Subscription Frequency</p>
              <Select
                rounded="full"
                border="none"
                bgcolor="primary"
                placeholder="Select frequency"
                value={subscription.frequency}
                updateValue={onSubscFrequencyChange}
                options={freqOpts}
                disabled={deliveryTypes.includes('Local Subscriptions')}
              />
            </div>
            <div className={styles.control}>
              <p>Subscription Discount</p>
              <Input
                name="discount"
                rounded="full"
                border="none"
                bgcolor="secondary"
                adornment={{ position: 'left', content: '%' }}
                placeholder="Subscription Discount"
                value={subscription.discount}
                updateValue={onSubscInputChange}
                disabled={deliveryTypes.includes('Local Subscriptions')}
              />
            </div>
          </div>
        </div>
        <div className={styles.subForm}>
          <h2>For local subscriptions only</h2>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Subscription Frequency</p>
              <Select
                rounded="full"
                border="none"
                bgcolor="primary"
                placeholder="Select frequency"
                value={subscription.frequency}
                updateValue={onSubscFrequencyChange}
                disabled={deliveryTypes.includes('Shipping')}
                options={freqOpts}
              />
            </div>
            <div className={styles.control}>
              <p>Subscription Discount</p>
              <Input
                name="discount"
                rounded="full"
                border="none"
                bgcolor="secondary"
                adornment={{ position: 'left', content: '%' }}
                placeholder="Subscription Discount"
                value={subscription.discount}
                updateValue={onSubscInputChange}
                disabled={deliveryTypes.includes('Shipping')}
              />
            </div>
          </div>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Subscription Duration</p>
              <Input
                name="duration"
                border="none"
                bgcolor="secondary"
                adornment={{ position: 'right', content: 'Weeks' }}
                placeholder="Number"
                value={subscription.duration}
                updateValue={onSubscInputChange}
                disabled={deliveryTypes.includes('Shipping')}
              />
            </div>
          </div>
          <p>Or</p>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>
                Start Date <span className={styles.optional}>(Optional)</span>
              </p>
              <Input
                type="date"
                name="startDate"
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="--/--/----"
                value={subscription.startDate}
                updateValue={onSubscInputChange}
                disabled={deliveryTypes.includes('Shipping')}
              />
            </div>
            <div className={styles.control}>
              <p>End Date</p>
              <Input
                type="date"
                name="endDate"
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="--/--/----"
                value={subscription.endDate}
                updateValue={onSubscInputChange}
                disabled={deliveryTypes.includes('Shipping')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.button} onClick={onCancelClick}>
          Cancel
        </button>
        <button
          className={clsx(styles.button, styles.updateBtn)}
          onClick={onUpdateClick}
        >
          Update
        </button>
      </div>
    </div>
  );
}
