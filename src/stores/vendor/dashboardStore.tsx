import { create } from 'zustand';

import ProductImg from '/assets/vendor/backs/product.png';

export type FulfillmentType =
  | 'Shipping'
  | 'Safe Pickup'
  | 'Partnered Pickup Location';

export type StatusType = 'Pending' | 'Under Process';

export interface ISalesTotal {
  transaction: number;
  averageOrder: number;
}

export interface ICustomerSurvey {
  count: number;
  data: number[];
}

export interface IProductRow {
  image: React.ReactNode;
  product: string;
  inventory: number;
  sold: number;
  revenue: number;
}

export interface ITotalRevenue {
  goal: number;
  yearly: number;
  all: number;
}

export interface ITotalSurvey {
  customer: number;
  order: number;
  product: number;
  revenue: ITotalRevenue;
}

export interface ISales {
  yearToDate: number;
  thisMonth: number;
  thisWeek: number;
  total: ISalesTotal;
}

export interface IActivitySurvey {
  customers: ICustomerSurvey;
  popularItems: IProductRow[];
  totals: ITotalSurvey;
}

export interface IOrderRow {
  id: number;
  customer: string;
  type: FulfillmentType;
  date: Date;
  amount: number;
  status: StatusType;
}

export interface IDashStore {
  step: number;
  updateStep: (_step: number) => void;

  salesSurvey: ISales;
  updateSalesSurvey: (_survey: ISales) => void;

  activitySurvey: IActivitySurvey;
  updateActivitySurvey: (_survey: IActivitySurvey) => void;

  currentOrders: IOrderRow[];
  updateCurrentOrders: (_orders: IOrderRow[]) => void;
}

const initialSalesSurvey: ISales = {
  yearToDate: 150258,
  thisMonth: 9025,
  thisWeek: 3058,
  total: {
    transaction: 410,
    averageOrder: 158,
  },
};

const initialActivitySurvey: IActivitySurvey = {
  customers: {
    count: 45,
    data: [10, 15, 22, 18, 20, 24, 21],
  },
  popularItems: [
    {
      image: <img src={ProductImg} />,
      product: 'Black Polish Radish',
      inventory: 120,
      sold: 34,
      revenue: 258.22,
    },
    {
      image: <img src={ProductImg} />,
      product: 'Artisan Bowls',
      inventory: 8,
      sold: 124,
      revenue: 2482,
    },
  ],
  totals: {
    customer: 158,
    order: 250,
    product: 65,
    revenue: {
      yearly: 150258,
      goal: 300516,
      all: 265000,
    },
  },
};

const initialCurrentOrders: IOrderRow[] = [
  {
    id: 653,
    customer: 'Brandon Monti',
    type: 'Shipping',
    date: new Date('02/28/2024'),
    amount: 200.58,
    status: 'Pending',
  },
  {
    id: 652,
    customer: 'Jeff Kenny',
    type: 'Safe Pickup',
    date: new Date('02/29/2024'),
    amount: 89.25,
    status: 'Under Process',
  },
];

export const useDashStore = create<IDashStore>(set => ({
  step: 1,
  updateStep: (_step: number) => set(state => ({ ...state, step: _step })),

  salesSurvey: initialSalesSurvey,
  updateSalesSurvey: (_survey: ISales) =>
    set(state => ({ ...state, salesSurvey: _survey })),

  activitySurvey: initialActivitySurvey,
  updateActivitySurvey: (_survey: IActivitySurvey) =>
    set(state => ({ ...state, activitySurvey: _survey })),

  currentOrders: initialCurrentOrders,
  updateCurrentOrders: (_orders: IOrderRow[]) =>
    set(state => ({ ...state, currentOrders: _orders })),
}));
