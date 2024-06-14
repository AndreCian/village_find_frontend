import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import * as _ from 'lodash';

import {
  IRecipient,
  IDelivery,
  IAddress
} from '@/components/customer/Checkout';
import { useAppSelector } from '@/redux/store';
import { HttpService } from '@/services';
import { AuthContext } from './AuthProvider';

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
    subscribe: string;
    frequencies: string[];
    discount: number;
    csa: {
      frequency: string;
      duration: number;
      startDate?: string;
      endDate?: string;
    }
  };
  shipping: {
    rates: any[];
    carrierAccount: string;
    serviceLevelToken: string;
    charge: number;
  };
  shippingRates: {
    name: string;
    amount: string;
    carrierAccount: string;
    serviceLevelToken: string;
  }[];
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
  shippingFee: number;
}

interface ICartContext {
  addressList: IAddress[];
  cartItems: ICartItem[];
  cartItemCount: number;
  summary: ISummary;
  setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
  setAddressList: (items: IAddress[]) => void;
}

const initialSummary: ISummary = {
  subTotal: 0,
  orderTotal: 0,
  pickupLocationFee: 0,
  safePickupFee: 0,
  deliveryFee: 0,
  shippingFee: 0,
};

export const usStates = [
  { "name": "Alabama", "code": "AL" },
  { "name": "Alaska", "code": "AK" },
  { "name": "Arizona", "code": "AZ" },
  { "name": "Arkansas", "code": "AR" },
  { "name": "California", "code": "CA" },
  { "name": "Colorado", "code": "CO" },
  { "name": "Connecticut", "code": "CT" },
  { "name": "Delaware", "code": "DE" },
  { "name": "Florida", "code": "FL" },
  { "name": "Georgia", "code": "GA" },
  { "name": "Hawaii", "code": "HI" },
  { "name": "Idaho", "code": "ID" },
  { "name": "Illinois", "code": "IL" },
  { "name": "Indiana", "code": "IN" },
  { "name": "Iowa", "code": "IA" },
  { "name": "Kansas", "code": "KS" },
  { "name": "Kentucky", "code": "KY" },
  { "name": "Louisiana", "code": "LA" },
  { "name": "Maine", "code": "ME" },
  { "name": "Maryland", "code": "MD" },
  { "name": "Massachusetts", "code": "MA" },
  { "name": "Michigan", "code": "MI" },
  { "name": "Minnesota", "code": "MN" },
  { "name": "Mississippi", "code": "MS" },
  { "name": "Missouri", "code": "MO" },
  { "name": "Montana", "code": "MT" },
  { "name": "Nebraska", "code": "NE" },
  { "name": "Nevada", "code": "NV" },
  { "name": "New Hampshire", "code": "NH" },
  { "name": "New Jersey", "code": "NJ" },
  { "name": "New Mexico", "code": "NM" },
  { "name": "New York", "code": "NY" },
  { "name": "North Carolina", "code": "NC" },
  { "name": "North Dakota", "code": "ND" },
  { "name": "Ohio", "code": "OH" },
  { "name": "Oklahoma", "code": "OK" },
  { "name": "Oregon", "code": "OR" },
  { "name": "Pennsylvania", "code": "PA" },
  { "name": "Rhode Island", "code": "RI" },
  { "name": "South Carolina", "code": "SC" },
  { "name": "South Dakota", "code": "SD" },
  { "name": "Tennessee", "code": "TN" },
  { "name": "Texas", "code": "TX" },
  { "name": "Utah", "code": "UT" },
  { "name": "Vermont", "code": "VT" },
  { "name": "Virginia", "code": "VA" },
  { "name": "Washington", "code": "WA" },
  { "name": "West Virginia", "code": "WV" },
  { "name": "Wisconsin", "code": "WI" },
  { "name": "Wyoming", "code": "WY" }
];

export const CartContext = React.createContext<ICartContext>({
  addressList: [],
  cartItems: [],
  cartItemCount: 0,
  summary: initialSummary,
  setCartItems: () => { },
  setAddressList: () => { },
});

interface ICartProviderProps {
  children: React.ReactNode;
}

const getCsaCycle = (csa: { frequency: string; duration: number; }) => {
  const values = csa.frequency.split('-');
  const period = Number(values[0]) || 1;
  return Math.floor(csa.duration / period);
}

export function CartProvider({ children }: ICartProviderProps) {
  const guestID = useAppSelector(state => state.guest.guestID);
  const { isLogin, account } = useContext(AuthContext);

  const [addressList, setAddressList] = useState<IAddress[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [summary, setSummary] = useState<ISummary>(initialSummary);

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
    if (isLogin) {
      HttpService.get('/user/customer/address').then(response => {
        setAddressList(response);
      });
    }
  }, [isLogin, account, guestID]);

  useEffect(() => {
    setCartItemCount(cartItems.reduce(
      (tot: number, cartItem: ICartItem) => tot + cartItem.quantity, 0
    ));

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

    const shippingFee = cartItems
      .filter((item: ICartItem) => item.deliveryType === 'Shipping')
      .reduce(
        (tot: number, item: ICartItem) =>
          tot + (item.shipping?.charge || 0),
        0,
      );

    const orderTotal = subTotal + pickupLocationFee + shippingFee;

    setSummary({
      ...summary,
      subTotal,
      pickupLocationFee,
      safePickupFee: 0,
      deliveryFee: 0,
      orderTotal,
      shippingFee,
    });

    // const updateItems = cartItems.map(item => _.omit(item, ['vendorId', 'productId', 'inventoryId']));
    // HttpService.put('/cart/total', updateItems).then(response => {
    //   const { status } = response;
    //   if (status === 200) { }
    // });
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ addressList, cartItems, cartItemCount, summary, setCartItems, setAddressList }}
    >
      {children}
    </CartContext.Provider>
  );
}
