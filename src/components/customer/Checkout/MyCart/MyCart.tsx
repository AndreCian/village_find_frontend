import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/forms';

import {
  CartItem,
  AddressPanel,
  Donation,
  IShipping,
  IDelivery,
} from '@/components/customer/Checkout';
import { HttpService } from '@/services';
import { ICartItem } from '@/pages/customer';

import styles from './MyCart.module.scss';

interface IMyCartProps {
  isLogin: boolean;
  onNextStep: () => void;
  cartItems: ICartItem[];
  setCartItems: (items: ICartItem[]) => void;
}

export interface IOrder {
  cartId: string;
  orderId: number;
  vendor: {
    shopName: string;
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
    soldByUnit: string;
    deliveryTypes: string[];
    subscription?: {
      frequency: string;
      discount: number;
      duration?: number;
      startDate?: number;
      endDate?: number;
    };
  };
  price: number;
  quantity: number;
  deliveryType?: string;
  personalization: {
    message: string;
  };
  subscription?: {
    issubscribed: boolean;
    iscsa: boolean;
    frequency: {
      unit: string;
      interval: number;
    };
    duration: number;
    discount: number;
    startDate: string;
    endDate: string;
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

const initialShipping: IShipping = {
  fullName: '',
  phone: '',
  email: '',
};

const initialDelivery: IDelivery = {
  street: '',
  city: '',
  country: '',
  extra: '',
  instruction: '',
  state: '',
  zipcode: 0,
};

export function MyCart({
  isLogin,
  onNextStep,
  cartItems,
  setCartItems,
}: IMyCartProps) {
  const [shipping, setShipping] = useState<IShipping>(initialShipping);
  const [delivery, setDelivery] = useState<IDelivery>(initialDelivery);
  const [donation, setDonation] = useState(0);

  const onRemoveCartClick = (id: string) => () => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  const onSubscribeChange = (id: string) => (subscription: any) => {
    setCartItems(
      cartItems.map(item =>
        item._id === id
          ? {
              ...item,
              subscription,
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
    if (
      cartItems.find(item => item._id === id && item.deliveryType === _option)
    ) {
      option = '';
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

  const onQuantityChange = (id: string) => (quantity: number) => {
    setCartItems(
      cartItems.map(item => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  const onCheckoutClick = () => {
    HttpService.post('/cart/checkout', {
      shipping,
      delivery,
      donation,
    }).then(response => {
      const { status } = response;
      if (status === 200) {
        onNextStep();
      }
    });
  };

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
              product={cartItem.inventoryId.productId}
              price={cartItem.price}
              quantity={cartItem.quantity}
              personalization={cartItem.personalization}
              subscription={cartItem.subscription}
              deliveryType={cartItem.deliveryType}
              pickuplocation={cartItem.pickuplocation}
              fulfillday={cartItem.fulfillday}
              gift={cartItem.gift}
              onSubscribeChange={onSubscribeChange(cartItem._id)}
              onGiftChange={onGiftChange(cartItem._id)}
              onDeleteCart={onRemoveCartClick(cartItem._id)}
              onDeliveryToggle={onDeliveryChange(cartItem._id)}
              onPickupLocationChange={onPickupLocationChange(cartItem._id)}
              onQuantityChange={onQuantityChange(cartItem._id)}
            />
          ))}
        </div>
      </div>
      <AddressPanel
        shipping={shipping}
        setShipping={setShipping}
        delivery={delivery}
        setDelivery={setDelivery}
      />
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
