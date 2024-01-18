import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Card, TableBody } from '@/components/common';
import { Input } from '@/components/forms';
import { ClipboardIcon, PrintIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import { formatDate } from '@/utils';

import OrderImg from '/assets/admin/backs/order.png';
import styles from './OrderDetail.module.scss';

type OrderType = 'Shipping' | 'Subscription, Home Delivery';
type PaymentType = 'Paid Up Front';
type PaymentStatus = 'Pause';

interface IOrder {
  date: Date;
  classification: OrderType;
  address: string;
  orderMsg: string;
  substitutes: boolean;
  personalization?: string;
  gift?: IGiftInfo;
  info?: IOrderInfo;
  orderItems: IOrderItem[];
}

interface IOrderItem {
  image: React.ReactNode;
  product: string;
  rate?: string;
  fee?: number;
  price: number;
  quantity: number;
  discount: number;
}

interface IGiftInfo {
  recipient: string;
  email: string;
  phone: string;
  customMsg: string;
}

interface IOrderInfo {
  subscription: {
    current: number;
    total: number;
  };
  payType: PaymentType;
  status: PaymentStatus;
}

interface ICustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IOrderDetail {
  id: number;
  customer: ICustomer;
  shipping: IOrder;
  homeDelivery: IOrder;
}

const initialShippingItems: IOrderItem[] = [
  {
    image: <img src={OrderImg} className={styles.orderImage} />,
    product: 'Black Polish Radish',
    rate: 'USPS Priority Mail $12.67',
    price: 23.56,
    quantity: 1,
    discount: 0,
  },
  {
    image: <img src={OrderImg} className={styles.orderImage} />,
    product: 'Bowls of Worth',
    rate: 'USPS Priority Mail $12.67',
    price: 23.56,
    quantity: 1,
    discount: 0,
  },
];

const initialHomeDeliveryItems: IOrderItem[] = [
  {
    image: <img src={OrderImg} className={styles.orderImage} />,
    product: 'Black Polish Radish',
    fee: 9.99,
    price: 23.56,
    quantity: 1,
    discount: 0,
  },
];

const initialHomeDeliveryInfo: IOrderInfo = {
  subscription: {
    current: 1,
    total: 15,
  },
  payType: 'Paid Up Front',
  status: 'Pause',
};

const initialOrderDet: IOrderDetail = {
  id: 834,
  shipping: {
    date: new Date('04/22/2023'),
    classification: 'Shipping',
    address: '313 Capitol Avenue Waterbury, Ct 06705',
    orderMsg: 'Leave package on patio.',
    substitutes: false,
    gift: {
      recipient: 'Nancy Macnimair',
      email: 'nancy@gmail.com',
      phone: '401-400-1249',
      customMsg:
        'Hey Nancy, I want to say I love you and I hope this gift finds you well.',
    },
    personalization:
      'Write on the front of the item: For my love and life - Nancy',
    orderItems: initialShippingItems,
  },
  customer: {
    name: 'Customer: Nathan Bargatzbe',
    email: 'brandon@fresherchoice.com',
    phone: '203-228-8814',
    address: '122 Park Street Bristol, Ct 06010',
  },
  homeDelivery: {
    date: new Date('04/22/2023'),
    classification: 'Subscription, Home Delivery',
    address: '122 Park Street Bristol, Ct 06010',
    orderMsg: 'Leave my package on the back of the patio.',
    substitutes: false,
    orderItems: initialHomeDeliveryItems,
    info: initialHomeDeliveryInfo,
  },
};

const shippingTableColumns: ITableColumn[] = [
  {
    title: 'Image',
    name: 'image',
    width: 100,
  },
  {
    title: 'Product Name',
    name: 'product',
    width: 250,
    cell: (row: IOrderItem) => (
      <span className={styles.bold}>{row.product}</span>
    ),
  },
  {
    title: 'Shipping Rate Selected',
    name: 'rate',
    width: 250,
  },
  {
    title: 'Product Price',
    name: 'price',
    width: 150,
    cell: (row: IOrderItem) => (
      <Input
        rounded="full"
        bgcolor="secondary"
        adornment={{ position: 'left', content: '$' }}
        value={row.price.toFixed(2)}
      />
    ),
  },
  {
    title: 'Order Quantity',
    name: 'quantity',
    width: 200,
    cell: (row: IOrderItem) => (
      <Input
        rounded="full"
        bgcolor="secondary"
        value={row.quantity.toFixed(3)}
      />
    ),
  },
  {
    title: 'Price',
    name: 'price',
    width: 100,
    cell: (row: IOrderItem) => <span>${row.price * row.quantity}</span>,
  },
  {
    title: 'Discount',
    name: 'discount',
    width: 100,
    cell: (row: IOrderItem) => <span>{row.discount} %</span>,
  },
  {
    title: 'Net Price',
    name: 'nprice',
    width: 150,
    cell: (row: IOrderItem) => (
      <span className={styles.bold}>
        $
        {((row.price * row.quantity * (100 - row.discount)) / 100.0).toFixed(2)}
      </span>
    ),
  },
];

const homeDeliveryTableColumns: ITableColumn[] = [
  {
    title: 'Image',
    name: 'image',
    width: 100,
  },
  {
    title: 'Product Name',
    name: 'product',
    width: 250,
    cell: (row: IOrderItem) => (
      <span className={styles.bold}>{row.product}</span>
    ),
  },
  {
    title: 'Home Delivery Fee',
    name: 'fee',
    width: 250,
    cell: (row: IOrderItem) => <span>${row.fee?.toFixed(2)}</span>,
  },
  {
    title: 'Product Price',
    name: 'price',
    width: 150,
    cell: (row: IOrderItem) => (
      <Input
        rounded="full"
        bgcolor="secondary"
        adornment={{ position: 'left', content: '$' }}
        value={row.price.toFixed(2)}
      />
    ),
  },
  {
    title: 'Order Quantity',
    name: 'quantity',
    width: 200,
    cell: (row: IOrderItem) => (
      <Input
        rounded="full"
        bgcolor="secondary"
        value={row.quantity.toFixed(3)}
      />
    ),
  },
  {
    title: 'Price',
    name: 'price',
    width: 100,
    cell: (row: IOrderItem) => <span>${row.price * row.quantity}</span>,
  },
  {
    title: 'Discount',
    name: 'discount',
    width: 100,
    cell: (row: IOrderItem) => <span>{row.discount} %</span>,
  },
  {
    title: 'Net Price',
    name: 'nprice',
    width: 150,
    cell: (row: IOrderItem) => (
      <span className={styles.bold}>
        $
        {((row.price * row.quantity * (100 - row.discount)) / 100.0).toFixed(2)}
      </span>
    ),
  },
];

const backToHomePath = '/admin/orders/home';

export function OrderDetail() {
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState<IOrderDetail>(initialOrderDet);

  const onBackToHome = () => {
    navigate(backToHomePath);
  };

  return (
    <div className={styles.root}>
      <button className={styles.backButton} onClick={onBackToHome}>
        Back
      </button>
      <Card title="Order Details" className={styles.detail}>
        <p>
          <span>Order Id:</span> {orderDetail.id}
        </p>
        <p>
          <span>Customer:</span> {orderDetail.customer.name}
        </p>
      </Card>
      <Card className={styles.infoSection}>
        <div className={styles.subInfo}>
          <h2>Ship Order Information</h2>
          <div className={styles.horizon}>
            <p className={styles.label}>Order date</p>
            <p>{formatDate(orderDetail.shipping.date)}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Order Classification</p>
            <p>{orderDetail.shipping.classification}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Shipping Address</p>
            <Input
              value={orderDetail.shipping.address}
              rounded="full"
              bgcolor="secondary"
              disabled={true}
              adornment={{ position: 'right', content: <ClipboardIcon /> }}
            />
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Delivery Instructions</p>
            <p>{orderDetail.shipping.orderMsg}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Substitutes</p>
            <p>{orderDetail.shipping.substitutes ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div className={styles.subInfo}>
          <h2>Gift Information</h2>
          <div className={styles.horizon}>
            <p className={styles.label}>Recipient's Name</p>
            <p>{orderDetail.shipping.gift?.recipient}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Email</p>
            <p>{orderDetail.shipping.gift?.email}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Phone Number</p>
            <p>{orderDetail.shipping.gift?.phone}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Custom Message</p>
            <p>{orderDetail.shipping.gift?.customMsg}</p>
          </div>
        </div>
      </Card>
      <Card title="Card Personalization" className={styles.personSection}>
        {orderDetail.shipping.personalization}
      </Card>
      <Card className={styles.shippingTableSection}>
        <TableBody
          columns={shippingTableColumns}
          rows={orderDetail.shipping.orderItems}
          className={styles.shippingTable}
          expandable={true}
          expandPanel={
            <div className={styles.shippingExpandPanel}>
              <div className={styles.subPanel}>
                <h3>Gift Information</h3>
                <div className={styles.horizon}>
                  <p className={styles.label}>Recipient's Name</p>
                  <p>{orderDetail.shipping.gift?.recipient}</p>
                </div>
                <div className={styles.horizon}>
                  <p className={styles.label}>Email</p>
                  <p>{orderDetail.shipping.gift?.email}</p>
                </div>
                <div className={styles.horizon}>
                  <p className={styles.label}>Phone Number</p>
                  <p>{orderDetail.shipping.gift?.phone}</p>
                </div>
                <div className={styles.horizon}>
                  <p className={styles.label}>Custom Message</p>
                  <p>{orderDetail.shipping.gift?.customMsg}</p>
                </div>
              </div>
              <div className={styles.subPanel}>
                <h3>Order Personalization</h3>
                <p>{orderDetail.shipping.personalization}</p>
              </div>
              <div className={styles.subPanel}>
                <h3>Actions</h3>
                <div className={styles.actions}>
                  <button className={clsx(styles.button, styles.refund)}>
                    Refund
                  </button>
                  <button className={clsx(styles.button, styles.replace)}>
                    Replace Item
                  </button>
                  <Input
                    value="Print"
                    rounded="full"
                    border="none"
                    bgcolor="secondary"
                    disabled={true}
                    adornment={{ position: 'right', content: <PrintIcon /> }}
                    className={styles.print}
                  />
                </div>
              </div>
            </div>
          }
        />
      </Card>
      <Card
        title="Home Delivery Order Information"
        className={styles.homeDelSection}
      >
        <div className={styles.form}>
          <div className={styles.horizon}>
            <p className={styles.label}>Order Date</p>
            <p>{formatDate(orderDetail.homeDelivery.date)}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Order Clasification</p>
            <p>{orderDetail.homeDelivery.classification}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Home Delivery Address</p>
            <Input
              value={orderDetail.homeDelivery.address}
              rounded="full"
              bgcolor="secondary"
              disabled={true}
              adornment={{ position: 'right', content: <ClipboardIcon /> }}
            />
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Order Instructions</p>
            <p>{orderDetail.homeDelivery.orderMsg}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Substitutes</p>
            <p>{orderDetail.homeDelivery.substitutes ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </Card>
      <Card title="Customer Information" className={styles.customInfo}>
        <div className={styles.horizon}>
          <p className={styles.label}>Email</p>
          <p>{orderDetail.customer.email}</p>
        </div>
        <div className={styles.horizon}>
          <p className={styles.label}>Phone Number</p>
          <p>{orderDetail.customer.phone}</p>
        </div>
        <div className={styles.horizon}>
          <p className={styles.label}>Address</p>
          <p>{orderDetail.customer.address}</p>
        </div>
      </Card>
      <Card className={styles.homeDeliveryTableSection}>
        <TableBody
          columns={homeDeliveryTableColumns}
          rows={orderDetail.homeDelivery.orderItems}
          className={styles.homeDeliveryTable}
          expandable={true}
          expandPanel={
            <div className={styles.shippingExpandPanel}>
              <div className={styles.subPanel}>
                <h3>Order Information</h3>
                <div className={styles.horizon}>
                  <p className={styles.label}>Subscription</p>
                  <p>
                    {orderDetail.homeDelivery.info?.subscription.current} of{' '}
                    {orderDetail.homeDelivery.info?.subscription.total}
                  </p>
                </div>
                <div className={styles.horizon}>
                  <p className={styles.label}>Payment</p>
                  <p>{orderDetail.homeDelivery.info?.payType}</p>
                </div>
                <div className={styles.horizon}>
                  <p className={styles.label}>Status</p>
                  <p>{orderDetail.homeDelivery.info?.status}</p>
                </div>
              </div>
              <div className={styles.subPanel}>
                <h3>Actions</h3>
                <div className={styles.actions}>
                  <button className={clsx(styles.button, styles.refund)}>
                    Refund
                  </button>
                  <button className={clsx(styles.button, styles.replace)}>
                    Replace Item
                  </button>
                  <Input
                    value="Print"
                    rounded="full"
                    border="none"
                    bgcolor="secondary"
                    disabled={true}
                    adornment={{ position: 'right', content: <PrintIcon /> }}
                    className={styles.print}
                  />
                </div>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
}
