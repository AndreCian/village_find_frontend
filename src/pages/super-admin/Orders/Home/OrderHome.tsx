import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Card, TableBody, TableToolbar } from '@/components';
import { Select, Input } from '@/components/forms';
import { PrintIcon } from '@/components/icons';

import { IRange, ITableColumn } from '@/interfaces';

import { formatDate, formatNumber } from '@/utils';

import styles from './OrderHome.module.scss';

const sortOpts = ['Alphabetical Order', 'Most Recent', 'Oldest'];

const statusOpts = ['Under Process', 'Canceled', 'Pause'];

const initialRange = {
  from: '',
  to: '',
};

export interface IOrder {
  customer: string;
  vendor: string;
  fulfilment: string;
  date: Date;
  total: number;
  status: 'Under Process' | 'Pause' | 'Canceld';
}

const initialTableData: any[] = [
  {
    customer: 'Bill Billerson',
    vendor: 'Bowls of Puter',
    fulfillment: 'Safe Pickup',
    date: new Date('04/07/2023'),
    total: 1758.87,
    status: 'Under Process',
  },
  {
    customer: 'Bowls of Puter',
    vendor: 'Jacobs Well Best Stuff',
    fulfillment: 'Safe Pickup',
    date: new Date('04/07/2023'),
    total: 1758.87,
    status: 'Canceled',
  },
  {
    customer: 'Nathan Bargatzbe',
    vendor: 'Jacobs Well Best Stuff',
    fulfillment: 'Home Delivery',
    date: new Date('04/07/2023'),
    total: 80.57,
    status: 'Pause',
  },
];

const orderViewPath = '/admin/orders/home/detail';

export function OrderHome() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [range, setRange] = useState<IRange>(initialRange);
  const [tableData, setTableData] = useState(initialTableData);

  const columns: ITableColumn[] = [
    {
      title: 'Customer Name',
      name: 'customer',
      width: 200,
      cell: (row: any) => <span className={styles.cell}>{row.customer}</span>,
    },
    {
      title: 'Vendor',
      name: 'vendor',
      width: 150,
      cell: (row: any) => <span className={styles.cell}>{row.vendor}</span>,
    },
    {
      title: 'Fulfillment Type',
      name: 'fulfillment',
      width: 200,
      cell: (row: any) => (
        <span className={styles.cell}>{row.fulfillment}</span>
      ),
    },
    {
      title: 'Order Date',
      name: 'date',
      width: 150,
      cell: (row: any) => (
        <Input
          type="date"
          value={formatDate(row.date)}
          rounded="full"
          bgcolor="secondary"
        />
      ),
    },
    {
      title: 'Order Total',
      name: 'total',
      width: 150,
      cell: (row: any) => <span>${formatNumber(row.total)}</span>,
    },
    {
      title: 'Status',
      name: 'status',
      width: 200,
      cell: (row: any) => (
        <Select
          rounded="full"
          border="none"
          bgcolor={
            row.status === 'Under Process'
              ? 'blue'
              : row.status === 'Canceled'
              ? 'red'
              : row.status === 'Pause'
              ? 'primary'
              : 'white'
          }
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
            onClick={() => navigate(orderViewPath)}
          >
            View
          </button>
          <PrintIcon />
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
        searchTitle="Search Customer Name"
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
