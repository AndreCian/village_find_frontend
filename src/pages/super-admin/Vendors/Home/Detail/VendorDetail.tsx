import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Card, TableBody } from '@/components/common';
import { Input, Select } from '@/components/forms';
import { ClipboardIcon, StarIcon } from '@/components/icons';
import { Logo } from '@/components/layout/other';

import { ITableColumn } from '@/interfaces';

import { formatDate } from '@/utils';

import styles from './VendorDetail.module.scss';

type ScrType = 'Seedling';
type StatusType = 'Active' | 'Blocked' | 'Paused' | 'Inactive';
type PayStatusType = 'Paid' | 'Unpaid';

export interface IVendorDetail {
  id: number;
  date: Date;
  scrType: ScrType;
  monFee: number;
  shopPos: string;
  status: StatusType;
}

export interface IContactDetail {
  owner: string;
  email: string;
  phone: string;
}

export interface IExtraInfo {
  rate: number;
  commission: number;
  community: string;
}

export interface IOrder {
  date: Date;
  total: number;
  commission: number;
  status: PayStatusType;
}

const initialVDetail: IVendorDetail = {
  id: 834,
  date: new Date('04/22/2023'),
  scrType: 'Seedling',
  monFee: 0,
  shopPos: '313 Capitol Avenue Waterbury, Ct 06705',
  status: 'Active',
};

const initialCDetail: IContactDetail = {
  owner: 'Nathan Bargatzbe',
  email: 'Nathan.Bargatzbe@gmail.com',
  phone: '401-400-1249',
};

const initialExInfo: IExtraInfo = {
  rate: 3,
  commission: 8,
  community: 'Field of Artisans',
};

const statusOpts: string[] = ['Active', 'Blocked', 'Paused', 'Inactive'];
const initialOrders: IOrder[] = [
  {
    date: new Date('04/22/2023'),
    total: 20,
    commission: 2,
    status: 'Paid',
  },
  {
    date: new Date('04/22/2023'),
    total: 20,
    commission: 2,
    status: 'Unpaid',
  },
];

const orderColumns: ITableColumn[] = [
  {
    title: 'Order Date',
    name: 'date',
    width: 200,
    cell: (row: IOrder) => <span>{formatDate(row.date)}</span>,
  },
  {
    title: 'Total Earned',
    name: 'total',
    width: 150,
    cell: (row: IOrder) => <span>${row.total.toFixed(2)}</span>,
  },
  {
    title: 'Commission',
    name: 'commission',
    width: 300,
    cell: (row: IOrder) => <span>${row.commission.toFixed(2)}</span>,
  },
  {
    title: 'Status',
    name: 'status',
    width: 150,
    cell: (row: IOrder) => (
      <p
        className={clsx(
          styles.payStatus,
          row.status === 'Paid' ? styles.paid : styles.unpaid,
        )}
      >
        {row.status}
      </p>
    ),
  },
];

const backToHomePath = '/admin/vendors/home';

export function VendorDetail() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState<IVendorDetail>(initialVDetail);
  const [contact, setContact] = useState<IContactDetail>(initialCDetail);
  const [extraInfo, setExtraInfo] = useState<IExtraInfo>(initialExInfo);
  const [orders, setOrders] = useState<IOrder[]>(initialOrders);

  const onBackToHome = () => {
    navigate(backToHomePath);
  };

  return (
    <div className={styles.root}>
      <button className={styles.backButton} onClick={onBackToHome}>
        Back
      </button>
      <div className={styles.topSection}>
        <Card title="John & Sam's Cool Things" className={styles.card}>
          <div className={styles.rateBar}>
            {[0, 1, 2, 3, 4].map((rate: number) => (
              <StarIcon active={rate < extraInfo.rate} />
            ))}
          </div>
          <p>
            <span>Vendor Id:</span> {vendor.id}
          </p>
          <p>
            <span>Shop Owner</span> - {contact.owner}
          </p>
        </Card>
        <Card title="Status">
          <Select
            placeholder="Status"
            value={vendor.status}
            options={statusOpts}
            rounded="full"
            className={styles.statusSelector}
          />
        </Card>
        <Card title="Commission">
          <Input
            placeholder="Commission"
            value={extraInfo.commission.toString()}
            adornment={{
              position: 'left',
              content: '%',
            }}
            rounded="full"
            className={styles.comInput}
          />
        </Card>
        <Card title="Village Community">
          <div className={styles.communities}>
            <Logo size="medium" />
            <span>{extraInfo.community}</span>
          </div>
        </Card>
      </div>
      <Card className={styles.vendorSection}>
        <h2>Vendor Information</h2>
        <div className={styles.horizon}>
          <p className={styles.label}>Signup Date</p>
          <p>{formatDate(vendor.date)}</p>
        </div>
        <div className={styles.horizon}>
          <p className={styles.label}>Subscription Type</p>
          <p>{vendor.scrType}</p>
        </div>
        <div className={styles.horizon}>
          <p className={styles.label}>Monthly Fee</p>
          <Input
            rounded="full"
            adornment={{ position: 'left', content: '$' }}
            value={vendor.monFee.toFixed(2)}
            className={styles.feeInput}
          />
        </div>
        <div className={styles.horizon}>
          <p className={styles.label}>Shop Location</p>
          <Input
            rounded="full"
            bgcolor="secondary"
            adornment={{ position: 'right', content: <ClipboardIcon /> }}
            value={vendor.shopPos}
            className={styles.locationInput}
          />
        </div>
        <h2>Contact Information</h2>
        <div className={styles.horizon}>
          <p className={styles.label}>Shop Owner Name</p>
          <p>{contact.owner}</p>
        </div>
        <div className={styles.horizon}>
          <p className={styles.label}>Email</p>
          <p>{contact.email}</p>
        </div>
        <div className={styles.horizon}>
          <p className={styles.label}>Phone Number</p>
          <p>{contact.phone}</p>
        </div>
      </Card>
      <Card title="Orders" className={styles.orderSection}>
        <TableBody columns={orderColumns} rows={orders} />
      </Card>
    </div>
  );
}
