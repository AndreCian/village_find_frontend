import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import clsx from 'clsx';

import { Container } from '@/components/layout/customer';

import {
  AuthPanel,
  MyCart,
  OrderSummary,
  Payment,
  ShippingMode,
  Complete,
  IDelivery,
  IRecipient
} from '@/components/customer/Checkout';
import { useAppSelector } from '@/redux/store';
import { HttpService } from '@/services';
import { AuthContext } from '@/providers';
import { STRIPE_PUBLISH_KEY } from '@/config/global';

import styles from './Checkout.module.scss';

const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

export interface ICartItem {
  _id: string;
  orderId: number;
  vendorId: {
    stripeAccountID: string;
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
        eventDate?: string;
        pickupWeekday?: number;
        pickupTime: {
          from: string;
          to: string;
        };
        instruction: string;
        charge: number;
      }[];
    };
    business: {
      name: string;
      phone: string;
    }
  };
  productId: {
    name: string;
    image: string;
    soldByUnit: string;
    subscription?: any;
    personalization?: {
      message: string;
    };
    attrs: object;
    deliveryTypes: string[];
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
  };
  price: number;
  quantity: number;
  image: string;
  deliveryType?: string;
  delivery: IDelivery;
  recipient: IRecipient;
  personalization: {
    fee: number;
    message: string;
  };
  buymode: string;
  subscription: {
    iscsa: boolean;
    subscribe?: string;
    frequencies: string[];
    discount: number;
    csa: {
      frequency: string;
      duration: number;
      startDate?: string;
      endDate?: string;
    }
  };
  pickuplocation: {
    name: string;
    address: string;
    charge: number;
    instruction: string;
    pickupDate: string;
    pickupTime: {
      from: string;
      to: string;
    };
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

const getCsaCycle = (csa: { frequency: string; duration: number; }) => {
  const values = csa.frequency.split('-');
  const period = Number(values[0]) || 1;
  return Math.floor(csa.duration / period);
}

export function Checkout() {
  const [searchParams] = useSearchParams();

  const { isLogin, account } = useContext(AuthContext);
  const guestID = useAppSelector(state => state.guest.guestID);

  const [step, setStep] = useState(0);
  const [donation, setDonation] = useState(1);
  const [shipping, setShipping] = useState('');
  const [summary, setSummary] = useState<ISummary>(initialSummary);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const onNextStep = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    const params: any = {};
    if (isLogin) {
      params.mode = 'customer';
      params.buyerID = account?.profile._id;
    } else {
      params.mode = 'guest';
      params.buyerID = guestID;
    }
    HttpService.get('/cart', params).then(response => {
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
      if (item.subscription.iscsa) {
        return (
          tot +
          (item.price *
            item.quantity *
            getCsaCycle(item.productId.subscription.csa))
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
        {step !== 3 && <AuthPanel isLogin={isLogin} />}
        {step === 0 ? (
          <MyCart
            isLogin={isLogin}
            onNextStep={onNextStep}
            cartItems={cartItems}
            setCartItems={setCartItems}
            donation={donation}
            setDonation={setDonation}
          />
        ) : step === 1 ? (
          <ShippingMode onNextStep={onNextStep} shipping={shipping} setShipping={setShipping} />
        ) : step === 2 ? (
          <Elements stripe={stripePromise}>
            <Payment
              onNextStep={onNextStep}
              summary={summary}
              cartItems={cartItems}
              donation={donation}
              shipping={shipping}
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
