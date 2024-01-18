import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/forms';

import {
  CartItem,
  AddressPanel,
  Donation,
} from '@/components/customer/Checkout';

import styles from './MyCart.module.scss';

const initialCartItems = [
  {
    vendorName: 'Hillandale Food Hub',
    orderId: 2983,
    products: [
      {
        name: 'Black Polish Radish',
        marketType: 'Subscription',
        subscription: {
          subscribed: 'Friday',
          duration: 22,
          frequency: 'Weekly',
          start_date: new Date('05/24/2023'),
          end_date: new Date('08/18/2023'),
        },
        price: 11.47,
        quantity: 1,
        soldUnit: 'cnt',
        image: '/assets/customer/checkout/product.png',
      },
    ],
    deliveryOptions: ['Home Delivery', 'Pickup Location'],
    logo: '/assets/customer/checkout/vendor1.png',
  },
  {
    vendorName: "Jan's Amazing Bracelets",
    orderId: 2983,
    products: [
      {
        name: 'Black Polish Radish',
        marketType: 'Shipping',
        style: {
          size: 'Small',
          color: 'Green',
        },
        personalization: {
          message:
            'Kitchen knives developed by industry rofessionals and andcrafted by third-generation',
        },
        price: 11.47,
        quantity: 1,
        soldUnit: 'cnt',
        image: '/assets/customer/checkout/product.png',
      },
      {
        name: 'Black Polish Radish',
        marketType: 'Shipping',
        subscription: {
          frequency: '',
        },
        price: 11.47,
        quantity: 1,
        soldUnit: 'cnt',
        image: '/assets/customer/checkout/product.png',
      },
    ],
    deliveryOptions: ['Shipping', 'Home Delivery', 'Pickup Location'],
    logo: '/assets/customer/checkout/vendor2.png',
  },
];

interface IMyCartProps {
  isLogin: boolean;
  onNextStep: () => void;
}

export function MyCart({ isLogin, onNextStep }: IMyCartProps) {
  return (
    <div className={styles.root}>
      <div className={styles.cart}>
        <p className={styles.title}>My Cart</p>
        <div className={styles.cartItemList}>
          {initialCartItems.map((cartItem: any, index: number) => (
            <CartItem key={index} {...cartItem} />
          ))}
        </div>
      </div>
      <AddressPanel />
      <Donation />
      <Button
        className={clsx(
          styles.button,
          isLogin ? styles.checkoutBtn : styles.loginBtn,
        )}
        onClick={onNextStep}
      >
        {isLogin ? 'Checkout' : 'Login In To Order'}
      </Button>
    </div>
  );
}
