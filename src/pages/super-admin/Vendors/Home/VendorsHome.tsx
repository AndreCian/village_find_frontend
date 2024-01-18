import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Card, TableBody, TableToolbar } from '@/components';
import { Select } from '@/components/forms';

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
  vendor: string;
  owner: string;
  address: string;
  subscription: number;
  revenue: number;
  status: StatusType;
}

const initialTableData: IVendor[] = [
  {
    vendor: 'Bill Billerson',
    owner: 'Bowls of Puter',
    address: '313 Capitol Avenue Waterbury, Ct 06705',
    subscription: 4.99,
    revenue: 56560.67,
    status: 'Active',
  },
  {
    vendor: 'Bowls of Puter',
    owner: 'Jacobs Well Best Stuff',
    address: '313 Capitol Avenue Waterbury, Ct 06705',
    subscription: 4.99,
    revenue: 23456.78,
    status: 'Active',
  },
  {
    vendor: 'John & Sams Cool Things',
    owner: 'Nathan Bargatzbe',
    address: '313 Capitol Avenue Waterbury, Ct 06705',
    subscription: 4.99,
    revenue: 103995.56,
    status: 'Active',
  },
];

const vendorViewPath = '/admin/vendors/home/detail';

export function VendorsHome() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [range, setRange] = useState<IRange>(initialRange);
  const [tableData, setTableData] = useState(initialTableData);

  const columns: ITableColumn[] = [
    {
      title: 'Vendor Name',
      name: 'vendor',
      width: 150,
    },
    {
      title: 'Shop Owner',
      name: 'owner',
      width: 150,
    },
    {
      title: 'Address',
      name: 'address',
      width: 200,
      cell: (row: any) => <span className={styles.cell}>{row.address}</span>,
    },
    {
      title: 'Subscription',
      name: 'subscription',
      width: 150,
      cell: (row: any) => (
        <div className={styles.subscription}>
          <span>Seedling</span>
          <span>{row.subscription}</span>
        </div>
      ),
    },
    {
      title: 'Revenue',
      name: 'revenue',
      width: 150,
      cell: (row: any) => <span>${formatNumber(row.revenue)}</span>,
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
            onClick={() => navigate(vendorViewPath)}
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

  return (
    <Card title="All Orders" className={styles.root}>
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
        rows={tableData}
        className={styles.tableBody}
      />
    </Card>
  );
}
