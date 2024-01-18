import { Card, TableBody, TableToolbar } from '@/components/common';

import { ITableColumn } from '@/interfaces';

import { formatDate, formatNumber } from '@/utils';

import styles from './Customers.module.scss';

export function Customers() {
  const customers = 278;
  const customerTableColumns: ITableColumn[] = [
    {
      title: 'Customer Name',
      name: 'name',
      width: 200,
    },
    {
      title: 'Phone Number',
      name: 'phone',
      width: 200,
    },
    {
      title: 'Email',
      name: 'email',
      width: 300,
    },
    {
      title: 'Signup Date',
      name: 'date',
      width: 200,
      cell: (row: any) => <span>{formatDate(row.date)}</span>,
    },
    {
      title: 'Address',
      name: 'address',
      width: 200,
    },
    {
      title: 'Spend',
      name: 'spend',
      width: 250,
      cell: (row: any) => <span>${formatNumber(row.spend)}</span>,
    },
  ];
  const customerTableRows = [
    {
      name: 'Brandon Monti',
      phone: '203-228-8814',
      email: 'brandon@fresherchoice.com',
      date: new Date('02/28/2024'),
      address: '122 Park St. Bristol Ct, 06705',
      spend: 2007.95,
    },
  ];

  return (
    <div className={styles.root}>
      <Card className={styles.customCount}>
        <p>Customers</p>
        <span>{customers}</span>
      </Card>
      <div className={styles.customerTable}>
        <TableToolbar selectable={false} className={styles.tableToolbar} />
        <Card>
          <TableBody columns={customerTableColumns} rows={customerTableRows} />
        </Card>
      </div>
    </div>
  );
}
