import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/forms';

import {
  CartItem,
  AddressPanel,
  Donation,
  IRecipient,
  IDelivery,
} from '@/components/customer/Checkout';
import { ICartItem } from '@/pages/customer';
import { HttpService } from '@/services';

import styles from './MyCart.module.scss';

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
  cartItems: ICartItem[];
  setCartItems: (items: ICartItem[]) => void;
  donation: number;
  setDonation: (value: number) => void;
}

export interface IOrder {
  _id?: string;
  cartId: string;
  orderId: number;
  vendor: {
    images: {
      logoUrl: string;
    };
    fulfillment: {
      delivery: {
        leadTime: number;
        days: {
          weekday: number;
          from: string;
          to: string;
        }[];
      };
      pickup: {
        leadTime: number;
        days: {
          weekday: number;
          from: string;
          to: string;
        }[];
      };
      locations: {
        name: string;
        address: string;
        eventDate: string;
        pickup?: {
          weekday: number;
          from: string;
          to: string;
        };
        charge: number;
      }[];
    };
    business: {
      name: string;
    }
  };
  inventory: {
    image: string;
    styleId: {
      attributes: {
        _id: string;
        name: string;
      }[];
    };
    attrs: any;
  };
  product: {
    name: string;
    image: string;
    soldByUnit: string;
    deliveryTypes: string[];
    subscription?: {
      iscsa: boolean;
      frequencies: string[];
      discount: number;
      csa: {
        frequency: string;
        duration: number;
        startDate?: number;
        endDate?: number;
      }
    };
  };
  price: number;
  quantity: number;
  image: string;
  deliveryType?: string;
  personalization: {
    message: string;
  };
  buymode: string;
  subscription?: {
    iscsa: boolean;
    frequencies: string[];
    subscribe?: string;
    discount: number;
    csa: {
      frequency: string;
      duration: number;
      startDate?: string;
      endDate?: string;
    }
  };
  pickuplocation?: {
    name: string;
    address: string;
    charge: number;
  };
  fulfillday?: {
    day: string;
    from: string;
    to: string;
  };
  gift: any;
}

export function MyCart({
  isLogin,
  onNextStep,
  cartItems,
  setCartItems,
  donation,
  setDonation,
}: IMyCartProps) {
  const [isShippingForm, setIsShippingForm] = useState(false);
  const [currentCartID, setCurrentCartID] = useState('');
  const [addressList, setAddressList] = useState<IAddress[]>([]);

  const onRemoveCartClick = (id: string) => () => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  const onSubscribeChange = (id: string) => (subscription: any) => {
    setCartItems(
      cartItems.map(item =>
        item._id === id
          ? {
            ...item,
            subscription
          }
          : item,
      ),
    );
  };

  const onGiftChange = (id: string) => (gift: any) => {
    setCartItems(
      cartItems.map(item => (item._id === id ? { ...item, gift } : item)),
    );
  };

  const onDeliveryChange = (id: string) => (_option: string) => {
    let option = _option;
    const cartItem = cartItems.find(item => item._id === id && item.deliveryType === _option);
    if (cartItem) {
      option = '';
    } else {
      if (_option === 'Home Delivery' || _option === 'Shipping') {
        setIsShippingForm(true);
        setCurrentCartID(id);
      }
    }
    setCartItems(
      cartItems.map(item =>
        item._id === id
          ? {
            ...item,
            deliveryType: option,
          }
          : item,
      ),
    );
  };

  const onPickupLocationChange = (id: string) => (data: any) => {
    setCartItems(
      cartItems.map(item =>
        item._id === id
          ? {
            ...item,
            pickuplocation: data.location,
            fulfillday: data.fulfillday,
            deliveryType: 'Pickup Location',
          }
          : item,
      ),
    );
  };

  const onCurrentDeliveryChange = (delivery: IDelivery) => {
    setCartItems(cartItems.map(item => item._id === currentCartID ? { ...item, delivery } : item));
  }

  const onCurrentRecipientChange = (recipient: IRecipient) => {
    setCartItems(cartItems.map(item => item._id === currentCartID ? { ...item, recipient } : item));
  }

  const onQuantityChange = (id: string) => (quantity: number) => {
    setCartItems(
      cartItems.map(item => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  const onBuymodeChange = (id: string) => (mode: string) => {
    setCartItems(cartItems.map(item => item._id === id ? { ...item, buymode: mode } : item));
  }

  const onCheckoutClick = () => {
    if (!isLogin) {
      window.scrollTo(0, 0);
    } else {
      onNextStep();
    }
  };

  const getItemDelivery = () => {
    const item = cartItems.find(item => item._id === currentCartID);
    if (item?.gift) {
      return item.gift.delivery;
    }
    return item?.delivery;
  }

  const getItemRecipient = () => {
    const item = cartItems.find(item => item._id === currentCartID);
    if (item?.gift) {
      return item.gift.receiver;
    }
    return item?.recipient;
  }

  useEffect(() => {
    if (!isLogin) {
      setAddressList([]);
    } else {
      HttpService.get('/user/customer/address').then(response => {
        setAddressList(response || []);
      });
    }
  }, [isLogin]);

  return (
    <div className={styles.root}>
      <div className={styles.cart}>
        <p className={styles.title}>My Cart</p>
        <div className={styles.cartItemList}>
          {cartItems.map((cartItem: ICartItem) => (
            <CartItem
              key={cartItem.orderId}
              cartId={cartItem._id}
              orderId={cartItem.orderId}
              vendor={cartItem.vendorId}
              inventory={cartItem.inventoryId}
              product={cartItem.productId}
              price={cartItem.price}
              quantity={cartItem.quantity}
              image={cartItem.image}
              personalization={cartItem.personalization}
              buymode={cartItem.buymode}
              subscription={cartItem.subscription}
              deliveryType={cartItem.deliveryType}
              pickuplocation={cartItem.pickuplocation}
              fulfillday={cartItem.fulfillday}
              gift={cartItem.gift}
              onSubscribeChange={onSubscribeChange(cartItem._id)}
              onBuymodeChange={onBuymodeChange(cartItem._id)}
              onGiftChange={onGiftChange(cartItem._id)}
              onDeleteCart={onRemoveCartClick(cartItem._id)}
              onDeliveryToggle={onDeliveryChange(cartItem._id)}
              onPickupLocationChange={onPickupLocationChange(cartItem._id)}
              onQuantityChange={onQuantityChange(cartItem._id)}
              addressList={addressList}
            />
          ))}
        </div>
      </div>
      {isShippingForm && <AddressPanel
        addressList={addressList}
        recipient={getItemRecipient()}
        setRecipient={onCurrentRecipientChange}
        delivery={getItemDelivery()}
        setDelivery={onCurrentDeliveryChange}
      />}
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
