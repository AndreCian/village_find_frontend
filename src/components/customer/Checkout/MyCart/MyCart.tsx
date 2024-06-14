import { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/forms';
import {
  CartItem,
  Donation,
  IRecipient,
  IDelivery
} from '@/components/customer/Checkout';
import { CartContext, ICartItem } from '@/providers';

import styles from './MyCart.module.scss';
import { HttpService } from '@/services';

export interface IAddress {
  _id?: string;
  name: string;
  address: string;
  extras: string;
  default?: boolean;
}

interface IMyCartProps {
  isLogin: boolean;
  onNextStep: () => void;
  donation: number;
  setDonation: (value: number) => void;
}

export function MyCart({
  isLogin,
  onNextStep,
  donation,
  setDonation,
}: IMyCartProps) {
  const { cartItems, setCartItems } = useContext(CartContext);

  const onRemoveCartClick = (id: string) => () => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  const onSubscribeChange = (id: string) => (value: string) => {
    setCartItems(cartItems.map(item =>
      item._id === id ? ({ ...item, subscription: { ...(item.subscription || {}), subscribe: value } }) : item
    ));
  };

  const onGiftChange = (id: string) => (gift: any) => {
    setCartItems(
      cartItems.map(item => (item._id === id ? { ...item, gift } : item)),
    );
  };

  const onDeliveryChange = (id: string) => (_option: string) => {
    let option = _option, params: any = { deliveryType: option };
    const cartItem = cartItems.find(item => item._id === id && item.deliveryType === _option);
    if (cartItem) {
      option = '';
      params = { deliveryType: '', shipping: {} }
    }
    HttpService.put(`/cart/${id}`, params)
      .then(response => {
        const { status } = response;
        if (status === 200) {
          setCartItems(
            cartItems.map(item =>
              item._id === id
                ? {
                  ...item,
                  ...params
                }
                : item,
            ),
          );
        }
      });
  };

  const onPickupLocationChange = (id: string) => ({ location, fulfillday, instruction }: any) => {
    setCartItems(
      cartItems.map(item =>
        item._id === id
          ? {
            ...item,
            pickuplocation: {
              ...location,
              pickupDate: fulfillday.day,
              pickupTime: {
                from: fulfillday.from,
                to: fulfillday.to
              },
              instruction
            },
            deliveryType: 'Pickup Location',
          }
          : item,
      ),
    );
  };

  const onDeliveryInfoChange = (id: string) => ({ recipient, delivery }: { recipient: IRecipient, delivery: IDelivery }) => {
    setCartItems(cartItems.map(item =>
      item._id === id ? ({ ...item, recipient, delivery, deliveryType: 'Shipping' }) : item
    ));
  }

  const onQuantityChange = (id: string) => (quantity: number) => {
    setCartItems(
      cartItems.map(item => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  const onBuymodeChange = (id: string) => (mode: string) => {
    setCartItems(cartItems.map(item => item._id === id ? { ...item, buymode: mode } : item));
  }

  const onShippingRatesChange = (id: string) => (rates: any[]) => {
    console.log(rates);
    setCartItems([...cartItems.map(item => item._id === id
      ? ({ ...item, shipping: { ...item.shipping, rates }, deliveryType: 'Shipping' })
      : item)]);
  }

  const onShippingServiceChange = (id: string) => (shipping: any) => {
    setCartItems(cartItems.map(item => item._id === id
      ? ({ ...item, shipping })
      : item))
  }

  const onCheckoutClick = () => {
    if (!isLogin) {
      window.scrollTo(0, 0);
    } else {
      onNextStep();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.cart}>
        <p className={styles.title}>My Cart</p>
        <div className={styles.cartItemList}>
          {cartItems.map((cartItem: ICartItem) => (
            <CartItem
              key={cartItem.orderId}
              onDeliveryInfoChange={onDeliveryInfoChange(cartItem._id)}
              onSubscribeChange={onSubscribeChange(cartItem._id)}
              onShippingRatesChange={onShippingRatesChange(cartItem._id)}
              onShippingServiceChange={onShippingServiceChange(cartItem._id)}
              onBuymodeChange={onBuymodeChange(cartItem._id)}
              onGiftChange={onGiftChange(cartItem._id)}
              onDeleteCart={onRemoveCartClick(cartItem._id)}
              onDeliveryToggle={onDeliveryChange(cartItem._id)}
              onPickupLocationChange={onPickupLocationChange(cartItem._id)}
              onQuantityChange={onQuantityChange(cartItem._id)}
              {...cartItem}
            />
          ))}
        </div>
      </div>
      <Donation donation={donation} setDonation={setDonation} />
      <Button
        className={clsx(
          styles.button,
          isLogin ? styles.checkoutBtn : styles.loginBtn,
        )}
        onClick={onCheckoutClick}
      >
        {isLogin ? 'Checkout' : 'Login In To Order'}
      </Button>
    </div>
  );
}
