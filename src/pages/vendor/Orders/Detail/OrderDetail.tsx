import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { Card, TableBody } from '@/components/common';
import { Input } from '@/components/forms';
import { ClipboardIcon, PrintIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import { formatDate } from '@/utils';

import OrderImg from '/assets/admin/backs/order.png';
import styles from './OrderDetail.module.scss';
import { HttpService } from '@/services';
import { SERVER_URL } from '@/config/global';
import { enqueueSnackbar } from 'notistack';

interface IOrderDetail {
  orderID: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  deliveryType: string;
  deliveryInfo: {
    orderDate: Date;
    classification: string;
    address: string;
    instruction: string;
    isSubstitute: boolean;
  };
  gift?: {
    recipient: string;
    email: string;
    phone: string;
    message: string;
  };
  product: {
    image: string;
    name: string;
    shipping?: {
      service: string;
      rate: number;
    };
    delivery?: {
      fee: number;
    };
    subscription?: {
      cycle: {
        total: number;
        current: number;
      };
      status: string;
      payment: string;
    };
    price: number;
    quantity: number;
    discount: number;
  };
  personalization: string;
}

const initialOrderDet: IOrderDetail = {
  orderID: 0,
  customer: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  deliveryType: '',
  deliveryInfo: {
    orderDate: new Date(),
    classification: '',
    address: '',
    instruction: '',
    isSubstitute: false,
  },
  product: {
    image: '',
    name: '',
    shipping: {
      service: '',
      rate: 0,
    },
    delivery: {
      fee: 0,
    },
    price: 0,
    quantity: 0,
    discount: 0,
  },
  personalization: '',
};

const BACK_PATH = '/vendor/order';

export function OrderDetail() {
  const navigate = useNavigate();
  const { id: orderID } = useParams();
  const [orderDetail, setOrderDetail] = useState<IOrderDetail>(initialOrderDet);

  const onBackToHome = () => {
    navigate(BACK_PATH);
  };

  const onAddressClick = (address: string) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        enqueueSnackbar('Address copied', { variant: 'success' });
      })
      .catch(err => {
        enqueueSnackbar(
          'Copy failed. Please check browser clipboard setting.',
          { variant: 'warning' },
        );
      });
  };

  const orderProductColumns = useMemo(() => {
    return [
      {
        name: 'image',
        title: 'Image',
        cell: (row: any) => <img src={`${SERVER_URL}/${row.image}`} />,
      },
      {
        name: 'name',
        title: 'Product Name',
        width: 200,
      },
      ...[
        orderDetail.deliveryInfo.classification === 'Shipping'
          ? {
              name: 'shipping',
              title: 'Shipping Rate Selected',
              cell: (row: any) => (
                <p>
                  {row.shipping.service} ${row.shipping.rate}
                </p>
              ),
              width: 200,
            }
          : {
              name: 'delivery',
              title: `${orderDetail.deliveryInfo.classification} Fee`,
              cell: (row: any) => <p>${row.delivery.fee}</p>,
            },
      ],
      {
        name: 'price',
        title: 'Product Price',
      },
      {
        name: 'qantity',
        title: 'Order Quantity',
      },
      {
        name: 'total price',
        title: 'Price',
        cell: (row: any) => (
          <p>
            $
            {((row.price * row.quantity * (100 - row.discount)) / 100).toFixed(
              2,
            )}
          </p>
        ),
      },
      {
        name: 'discount',
        title: 'Discount',
        cell: (row: any) => <p>%{row.discount}</p>,
      },
      {
        name: 'net price',
        title: 'Net Price',
        cell: (row: any) => (
          <p>
            $
            {(
              (row.price * row.quantity * (100 - row.discount)) / 100 +
              (row.shipping?.rate || row.delivery.fee)
            ).toFixed(2)}
          </p>
        ),
      },
    ];
  }, [orderDetail]);

  useEffect(() => {
    if (!orderID) return;
    HttpService.get(`/order/vendor/${orderID}`).then(response => {
      setOrderDetail(response as IOrderDetail);
    });
  }, [orderID]);

  return (
    <div className={styles.root}>
      <button className={styles.backButton} onClick={onBackToHome}>
        Back
      </button>
      <Card title="Order Details" className={styles.detail}>
        <p>
          <span>Order Id:</span> {orderDetail.orderID}
        </p>
        <p>
          <span>Customer:</span> {orderDetail.customer.name}
        </p>
      </Card>
      <Card className={styles.infoSection}>
        <div className={styles.subInfo}>
          <h2>
            {`${orderDetail.deliveryInfo.classification} Order Information`}
          </h2>
          <div className={styles.horizon}>
            <p className={styles.label}>Order date</p>
            <p>{formatDate(orderDetail.deliveryInfo.orderDate)}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Order Classification</p>
            <p>{orderDetail.deliveryInfo.classification}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>
              {`${orderDetail.deliveryInfo.classification} Address`}
            </p>
            <Input
              rounded="full"
              bgcolor="secondary"
              disabled={true}
              adornment={{
                position: 'right',
                content: <ClipboardIcon />,
                onClick: () => onAddressClick(orderDetail.deliveryInfo.address),
              }}
              value={orderDetail.deliveryInfo.address}
              className={styles.addressInput}
            />
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Delivery Instructions</p>
            <p>{orderDetail.deliveryInfo.instruction}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Substitutes</p>
            <p>{orderDetail.deliveryInfo.isSubstitute ? 'Yes' : 'No'}</p>
          </div>
        </div>
        {orderDetail.gift && (
          <div className={styles.subInfo}>
            <h2>Gift Information</h2>
            <div className={styles.horizon}>
              <p className={styles.label}>Recipient's Name</p>
              <p>{orderDetail.gift.recipient}</p>
            </div>
            <div className={styles.horizon}>
              <p className={styles.label}>Email</p>
              <p>{orderDetail.gift.email}</p>
            </div>
            <div className={styles.horizon}>
              <p className={styles.label}>Phone Number</p>
              <p>{orderDetail.gift.phone}</p>
            </div>
            <div className={styles.horizon}>
              <p className={styles.label}>Custom Message</p>
              <p>{orderDetail.gift.message}</p>
            </div>
          </div>
        )}
      </Card>
      {orderDetail.deliveryInfo.classification !== 'Shipping' && (
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
      )}
      {orderDetail.personalization && (
        <Card title="Order Personalization" className={styles.personSection}>
          {orderDetail.personalization}
        </Card>
      )}
      <Card className={styles.shippingTableSection}>
        <TableBody
          columns={orderProductColumns}
          rows={[orderDetail.product]}
          className={styles.shippingTable}
          expandable={true}
          expandPanel={
            <div className={styles.shippingExpandPanel}>
              {orderDetail.gift && (
                <div className={styles.subPanel}>
                  <h3>Gift Information</h3>
                  <div className={styles.horizon}>
                    <p className={styles.label}>Recipient's Name</p>
                    <p>{orderDetail.gift.recipient}</p>
                  </div>
                  <div className={styles.horizon}>
                    <p className={styles.label}>Email</p>
                    <p>{orderDetail.gift.email}</p>
                  </div>
                  <div className={styles.horizon}>
                    <p className={styles.label}>Phone Number</p>
                    <p>{orderDetail.gift.phone}</p>
                  </div>
                  <div className={styles.horizon}>
                    <p className={styles.label}>Custom Message</p>
                    <p>{orderDetail.gift.message}</p>
                  </div>
                </div>
              )}
              {orderDetail.personalization && (
                <div className={styles.subPanel}>
                  <h3>Order Personalization</h3>
                  <p>{orderDetail.personalization}</p>
                </div>
              )}
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
