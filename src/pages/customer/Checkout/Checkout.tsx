import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import clsx from 'clsx';

import { Container } from '@/components/layout/customer';

import { STRIPE_PUBLISH_KEY } from '@/config/global';
import {
  AuthPanel,
  MyCart,
  OrderSummary,
  Payment,
  ShippingMode,
  Complete,
} from '@/components/customer/Checkout';
import { HttpService } from '@/services';
import { AuthContext } from '@/providers';

import styles from './Checkout.module.scss';

const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

export interface ICartItem {
  _id: string;
  orderId: number;
  vendorId: {
    stripeAccountID: string;
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
  inventoryId: {
    attrs: any;
    image: string;
    styleId: {
      attributes: {
        _id: string;
        name: string;
      }[];
    };
    productId: {
      name: string;
      soldByUnit: string;
      subscription?: any;
      personalization?: {
        message: string;
      };
      attrs: object;
      deliveryTypes: string[];
    };
  };
  quantity: number;
  price: number;
  deliveryType?: string;
  personalization: {
    fee: number;
    message: string;
  };
  subscription: {
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
  pickuplocation: {
    name: string;
    address: string;
    charge: number;
  };
  fulfillday: {
    day: string;
    from: string;
    to: string;
  };
  gift: any;
}

export interface ISummary {
  subTotal: number;
  orderTotal: number;
  pickupLocationFee: number;
  safePickupFee: number;
  deliveryFee: number;
  shippingFee: string;
  giftShippingFee: string;
}

const initialSummary: ISummary = {
  subTotal: 0,
  orderTotal: 0,
  pickupLocationFee: 0,
  safePickupFee: 0,
  deliveryFee: 0,
  shippingFee: 'Calculated on next page',
  giftShippingFee: 'Calculated on next page',
};

export function Checkout() {
  const [searchParams] = useSearchParams();
  const context = useContext(AuthContext);
  const [step, setStep] = useState(0);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [summary, setSummary] = useState<ISummary>(initialSummary);

  const onNextStep = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    HttpService.get('/cart').then(response => {
      const { status } = response;
      if (!status) {
        setCartItems(response || []);
      }
    });
  }, []);

  useEffect(() => {
    const step = searchParams.get('step');
    if (!step) {
      setStep(0);
    } else if (step === 'shipping') {
      setStep(1);
    }
  }, [searchParams]);

  useEffect(() => {
    const subTotal = cartItems.reduce((tot: number, item: ICartItem) => {
      if (
        item.inventoryId.productId.deliveryTypes.includes('Local Subscriptions')
      ) {
        return (
          tot +
          (item.price *
            item.quantity *
            item.inventoryId.productId.subscription.duration) /
            100
        );
      }
      return tot + item.price * item.quantity;
    }, 0);

    const pickupLocationFee = cartItems
      .filter((item: ICartItem) => item.deliveryType === 'Pickup Location')
      .reduce(
        (tot: number, item: ICartItem) =>
          tot + (item.pickuplocation?.charge || 0),
        0,
      );

    const orderTotal = subTotal + pickupLocationFee;
    setSummary({
      ...summary,
      subTotal,
      pickupLocationFee,
      safePickupFee: 0,
      deliveryFee: 0,
      orderTotal,
    });
  }, [cartItems]);

  return (
    <Container
      className={clsx(styles.root, { [styles.fullWidth]: step === 3 })}
    >
      <div className={styles.contentPanel}>
        {step !== 3 && <AuthPanel isLogin={context.isLogin} />}
        {step === 0 ? (
          <MyCart
            isLogin={context.isLogin}
            onNextStep={onNextStep}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        ) : step === 1 ? (
          <ShippingMode onNextStep={onNextStep} />
        ) : step === 2 ? (
          <Elements stripe={stripePromise}>
            <Payment
              onNextStep={onNextStep}
              summary={summary}
              cartItems={cartItems}
            />
          </Elements>
        ) : (
          <Complete />
        )}
      </div>
      {step !== 3 && (
        <div className={styles.summary}>
          <OrderSummary summary={summary} />
        </div>
      )}
    </Container>
  );
}
