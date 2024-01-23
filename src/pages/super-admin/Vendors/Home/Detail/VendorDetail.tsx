import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { Card, TableBody } from '@/components/common';
import { Input, Select } from '@/components/forms';
import { ClipboardIcon, StarIcon } from '@/components/icons';

import { HttpService } from '@/services';

import { formatDate } from '@/utils';

import { ITableColumn } from '@/interfaces';

import styles from './VendorDetail.module.scss';

type ScrType = 'Seedling';
type StatusType = 'Active' | 'Blocked' | 'Paused' | 'Inactive';
type PayStatusType = 'Paid' | 'Unpaid';

export interface IVendorDetail {
  id: number;
  shopName: string;
  date: string;
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
  community: {
    _id: string;
    name: string;
    images: string[];
  };
}

export interface IOrder {
  date: string;
  total: number;
  commission: number;
  status: PayStatusType;
}

const statusOpts: string[] = ['Active', 'Blocked', 'Paused', 'Inactive'];

const orderColumns: ITableColumn[] = [
  {
    title: 'Order Date',
    name: 'date',
    width: 200,
    cell: (row: IOrder) => <span>{formatDate(new Date(row.date))}</span>,
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

const backToHomePath = '/admin/vendors';

export function VendorDetail() {
  const navigate = useNavigate();
  const { id: vendorId } = useParams();

  const [vendor, setVendor] = useState<IVendorDetail | null>(null);
  const [contact, setContact] = useState<IContactDetail | null>(null);
  const [extraInfo, setExtraInfo] = useState<IExtraInfo | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const onBackToHome = () => {
    navigate(backToHomePath);
  };

  useEffect(() => {
    if (!vendorId) return;
    HttpService.get(`/user/vendor?vendorId=${vendorId}`).then(response => {
      const { status, vendor } = response;
      if (status === 200) {
        const {
          shopName,
          vendorId: id,
          owner,
          status,
          commission,
          community,
          signupAt,
          subscription,
          monthlyFee,
          address,
        } = vendor;
        setVendor({
          id,
          shopName,
          date: signupAt,
          scrType: (subscription && subscription.name) ?? '',
          monFee: monthlyFee ?? 0,
          shopPos: address ?? '',
          status,
        });
        setContact({
          owner: (owner && owner.name) ?? '',
          email: (owner && owner.email) ?? '',
          phone: (owner && owner.phone) ?? '',
        });
        setExtraInfo({
          rate: 0,
          commission: commission ?? 0,
          community: community,
        });
      }
    });
  }, []);

  return (
    <div className={styles.root}>
      <button className={styles.backButton} onClick={onBackToHome}>
        Back
      </button>
      <div className={styles.topSection}>
        <Card title={vendor && vendor.shopName}>
          <div className={styles.rateBar}>
            {[0, 1, 2, 3, 4].map((rate: number) => (
              <StarIcon active={rate < ((extraInfo && extraInfo.rate) ?? 0)} />
            ))}
          </div>
          <p>
            <span>Vendor Id:</span> {vendor && vendor.id}
          </p>
          <p>
            <span>Shop Owner</span> - {contact && contact.owner}
          </p>
        </Card>
        <Card title="Status">
          <Select
            placeholder="Status"
            value={(vendor && vendor.status) ?? ''}
            options={statusOpts}
            rounded="full"
            className={styles.statusSelector}
          />
        </Card>
        <Card title="Commission">
          <Input
            type="number"
            placeholder="Commission"
            value={(extraInfo && extraInfo.commission) ?? ''}
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
            <img />
            <span>
              {extraInfo && extraInfo.community && extraInfo.community.name}
            </span>
          </div>
        </Card>
      </div>
      <Card className={styles.vendorSection}>
        <div className={styles.vendorInfo}>
          <h2>Vendor Information</h2>
          <div className={styles.horizon}>
            <p className={styles.label}>Signup Date</p>
            <p>{formatDate(new Date((vendor && vendor.date) ?? ''))}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Subscription Type</p>
            <p>{vendor && vendor.scrType}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Monthly Fee</p>
            <Input
              type="number"
              rounded="full"
              adornment={{ position: 'left', content: '$' }}
              value={(vendor && vendor.monFee.toFixed(2)) ?? 0}
              className={styles.feeInput}
            />
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Shop Location</p>
            <Input
              rounded="full"
              bgcolor="secondary"
              adornment={{ position: 'right', content: <ClipboardIcon /> }}
              value={(vendor && vendor.shopPos) ?? ''}
              className={styles.locationInput}
            />
          </div>
        </div>
        <div className={styles.contactInfo}>
          <h2>Contact Information</h2>
          <div className={styles.horizon}>
            <p className={styles.label}>Shop Owner Name</p>
            <p>{contact && contact.owner}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Email</p>
            <p>{contact && contact.email}</p>
          </div>
          <div className={styles.horizon}>
            <p className={styles.label}>Phone Number</p>
            <p>{contact && contact.phone}</p>
          </div>
        </div>
      </Card>
      <Card title="Orders" className={styles.orderSection}>
        <TableBody columns={orderColumns} rows={orders} />
      </Card>
    </div>
  );
}
