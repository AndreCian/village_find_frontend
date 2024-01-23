import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Card, TableBody, TableToolbar } from '@/components';
import { Select } from '@/components/forms';

import { HttpService } from '@/services';

import { IRange, ITableColumn } from '@/interfaces';

import { formatNumber } from '@/utils';

import styles from './VendorsHome.module.scss';

const sortOpts = [
  'Alphabetical Order',
  'Recently Added',
  'Highest Revenue',
  'Lowest Revenue',
];

const statusOpts = ['Active', 'Blocked', 'Paused', 'Inactive'];

const initialRange = {
  from: '',
  to: '',
};

type StatusType = 'Active' | 'Blocked' | 'Paused' | 'Inactive';

export interface IVendor {
  shopName: string;
  owner?: any;
  address?: string;
  subscription: any;
  revenue?: number;
  status: string;
}

const formatMonthlyFee = (price: number) => {
  return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
};

export function VendorsHome() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [range, setRange] = useState<IRange>(initialRange);
  const [vendors, setVendors] = useState([]);

  const columns: ITableColumn[] = [
    {
      title: 'Vendor Name',
      name: 'shopName',
      width: 150,
    },
    {
      title: 'Shop Owner',
      name: 'owner',
      width: 150,
      cell: (row: any) => (
        <div className={styles.cell}>{row.owner && row.owner.name}</div>
      ),
    },
    {
      title: 'Address',
      name: 'address',
      width: 200,
      cell: (row: any) => <div className={styles.cell}>{row.address}</div>,
    },
    {
      title: 'Subscription',
      name: 'subscription',
      width: 150,
      cell: (row: any) => (
        <div className={styles.subscription}>
          {row.subscription && (
            <>
              <span>{row.subscription.name}</span>
              {row.subscription.monthlyFee && (
                <span>{formatMonthlyFee(row.subscription.monthlyFee)}</span>
              )}
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Revenue',
      name: 'revenue',
      width: 150,
      cell: (row: any) => <span>${formatNumber(row.revenue || 0)}</span>,
    },
    {
      title: 'Status',
      name: 'status',
      width: 200,
      cell: (row: any) => (
        <Select
          rounded="full"
          value={row.status}
          options={statusOpts}
          className={styles.statusSelector}
        />
      ),
    },
    {
      title: 'Action',
      name: 'action',
      width: 250,
      cell: (row: any) => (
        <div className={styles.actionCell}>
          <button
            className={styles.actionButton}
            onClick={() => navigate(row._id)}
          >
            View
          </button>
        </div>
      ),
    },
  ];

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const onRangeChange =
    (which: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setRange({ ...range, [which]: new Date(e.target.value) });
    };

  useEffect(() => {
    HttpService.get('/user/vendor').then(response => {
      if (response) {
        setVendors(response);
      }
    });
  }, []);

  return (
    <Card title="All Vendors" className={styles.root}>
      <TableToolbar
        searchTitle="Search Shop Owner or Vendor Name"
        search={filter}
        updateSearch={onFilterChange}
        rangable={true}
        range={range}
        updateRange={onRangeChange}
        downloadable={true}
        sortable={true}
        sortOpts={sortOpts}
        sort={sort}
        updateSort={(_sort: string) => setSort(_sort)}
        selectTitle="Status"
        selectOpts={statusOpts}
        category={category}
        updateCategory={(_cat: string) => setCategory(_cat)}
        className={styles.tableToolbar}
        actions={
          <div className={styles.actions}>
            <div>
              <p>Submit</p>
              <button className={clsx(styles.button, styles.submit)}>
                Submit
              </button>
            </div>
            <div>
              <p>Reset</p>
              <button className={clsx(styles.button, styles.reset)}>
                Reset
              </button>
            </div>
          </div>
        }
      />
      <TableBody
        columns={columns}
        rows={vendors}
        className={styles.tableBody}
      />
    </Card>
  );
}
