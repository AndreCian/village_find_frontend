import { useMemo, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import clsx from 'clsx';

import { Button, Select } from '@/components/forms';
import { TrashIcon } from '@/components/icons';
import { PickDateDialog } from '@/components/customer/common';

import styles from './CartItem.module.scss';

type MarketType = 'Shipping' | 'Near By' | 'Subscription';

interface ICartItemProps {
  vendorName: string;
  orderId: number;
  logo: string;
  products: [
    {
      name: string;
      marketType: MarketType;
      subscription?: {
        frequency: string; // Weekly, Monthly
        discount: number;
        duration: number; // number of weeks
        start_date: Date;
        end_date: Date;
      };
      style?: {
        name: string;
        size: string;
        color: string;
      };
      personalization?: {
        fee: number;
        message: string;
      };
      price: number;
      quantity: number;
      soldUnit: string; // default - cnt
      image: string;
    },
  ];
  deliveryOptions: string[];
}

const initialFrequencies = [
  'Every month',
  'Every 2 months',
  'Every 3 months',
  'Every 6 months',
];

export function CartItem({
  vendorName,
  orderId,
  logo,
  products,
  deliveryOptions,
}: ICartItemProps) {
  const marketTypes = useMemo(() => {
    return [...new Set(products.map((item: any) => item.marketType as string))];
  }, [products]);

  const subTotal = useMemo(() => {
    return products.reduce(
      (tot: number, item: any, index: number) =>
        tot + item.price * item.quantity,
      0,
    );
  }, [products]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.vendor}>
          <img src={logo} />
          <div className={styles.order}>
            <p className={styles.name}>{vendorName}</p>
            <p className={styles.orderId}>
              Order ID: <span>{orderId}</span>
            </p>
          </div>
        </div>
        <div className={styles.delivery}>
          <p className={styles.title}>Delivery Options</p>
          <p className={styles.body}>{marketTypes.join(', ')}</p>
        </div>
        <div className={styles.subtotal}>
          <p className={styles.title}>Subtotal</p>
          <p className={styles.body}>${subTotal.toFixed(2)}</p>
        </div>
      </div>
      <div className={styles.products}>
        {products.map((product: any, index: number) => (
          <div key={index} className={styles.product}>
            <div className={styles.main}>
              <div className={styles.imageBar}>
                <img src={product.image} alt="The Product Image" />
                <div className={styles.quantity}>
                  <span className={styles.minus}>
                    <FaMinus fill="#3F3F3F" />
                  </span>
                  <p>{product.quantity}</p>
                  <span className={styles.plus}>
                    <FaPlus fill="white" />
                  </span>
                </div>
              </div>
              <div className={styles.majorInfo}>
                <div className={styles.heading}>
                  <p className={styles.title}>{product.name}</p>
                  <p className={styles.pricePerUnit}>
                    Minimum {product.quantity} Bunch at $
                    {product.price.toFixed(2)}/{product.soldUnit}
                  </p>
                </div>
                <div className={styles.price}>
                  <p className={styles.title}>Price</p>
                  <p className={styles.body}>
                    $
                    {(
                      product.price +
                        (product.personalization &&
                          product.personalization.fee) ?? 0
                    ).toFixed(2)}
                  </p>
                </div>
                {product.marketType === 'Shipping' ? (
                  <div className={styles.shipping}>
                    <div className={styles.gift}>
                      <div className={styles.heading}>
                        <p className={styles.title}>Would you like to</p>
                        <div className={styles.body}>
                          <Button className={styles.giftBtn}>
                            <p className={styles.label}>It's as gift</p>
                            <span>
                              <img src="/assets/customer/svgs/gift.svg" />
                            </span>
                          </Button>
                          {product.subscription && (
                            <Select
                              options={initialFrequencies}
                              placeholder="Subscribe"
                              className={styles.subscSelect}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.extra}>
                      {product.style && (
                        <div className={styles.style}>
                          <p className={styles.size}>
                            <span>Size: </span>
                            {product.style.size}
                          </p>
                          <p className={styles.color}>
                            <span>Color: </span>
                            {product.style.color}
                          </p>
                        </div>
                      )}
                      {product.personalization && (
                        <div className={styles.personalization}>
                          <p className={styles.title}>Personalized: </p>
                          <p className={styles.body}>
                            {product.personalization.message}
                          </p>
                          <span className={styles.expandBtn}>Expand</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : product.marketType === 'Subscription' ? (
                  <div className={styles.subscription}>
                    <p className={styles.head}>Would you like to</p>
                    <div className={styles.body}>
                      <div className={styles.text}>
                        <span>Subscribed:</span>
                        <p>{product.subscription.subscribed}</p>
                      </div>
                      <div className={clsx(styles.text, styles.duration)}>
                        <span>Subscription Duration:</span>
                        <p>
                          {product.subscription.duration} weeks from{' '}
                          {formatDate(product.subscription.start_date)} -{' '}
                          {formatDate(product.subscription.end_date)}
                        </p>
                      </div>
                      <div className={clsx(styles.text, styles.frequency)}>
                        <span>Subscription Frequency:</span>
                        <p>{product.subscription.frequency}</p>
                      </div>
                      <p className={styles.text}>
                        Your card will be charged{' '}
                        <span>
                          {product.price *
                            product.subscription.duration.toFixed(2)}{' '}
                          every {product.subscription.frequency} weeks
                        </span>{' '}
                        or until cancelation
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className={styles.action}>
              <p className={styles.removeBtn}>
                Remove
                <span>
                  <TrashIcon />
                </span>
              </p>
              <div className={styles.pricing}>
                <div className={styles.quantity}>
                  <span className={styles.minus}>
                    <FaMinus fill="#3F3F3F" />
                  </span>
                  <p>{product.quantity}</p>
                  <span className={styles.plus}>
                    <FaPlus fill="white" />
                  </span>
                </div>
                <div className={styles.price}>
                  <p className={styles.title}>Price</p>
                  <p className={styles.body}>${product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p className={styles.title}>Delivery Options</p>
        <div className={styles.buttons}>
          {['Shipping', 'Home Delivery', 'Pickup Location', 'Safe Pickup'].map(
            (item: string, index: number) => (
              <Button
                key={index}
                className={clsx(
                  styles.button,
                  !deliveryOptions.includes(item) ? 'hidden' : '',
                )}
              >
                {item}
              </Button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
