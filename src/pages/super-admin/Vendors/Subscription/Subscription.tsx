import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, TableToolbar, TableBody } from '@/components/common';
import { Select } from '@/components/forms';

import { TrashIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import styles from './Subscription.module.scss';

type StatusType = 'Active' | 'Blocked' | 'Paused' | 'Inactive';

export interface ISubscription {
  name: string;
  title: string;
  status: StatusType;
}

const initialSubsData: ISubscription[] = [
  {
    name: 'Freemium Plan',
    title: '0.00 per month + 0.00% transaction fee.',
    status: 'Active',
  },
  {
    name: 'Budding',
    title: '14.99 per month + 7.00% transaction fee.',
    status: 'Active',
  },
];

const statusOps: string[] = ['Active', 'Blocked', 'Paused', 'Inactive'];

const newSubscPath = '/admin/vendors/subscription/create';

export function Subscription() {
  const [subsData, setSubsData] = useState<ISubscription[]>(initialSubsData);

  const columns: ITableColumn[] = [
    {
      title: 'Subscription Name',
      name: 'name',
      width: 250,
    },
    {
      title: 'Title',
      name: 'title',
      width: 350,
    },
    {
      title: 'Status',
      name: 'status',
      width: 250,
      cell: (row: any) => (
        <Select
          rounded="full"
          value={row.status}
          options={statusOps}
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
          <button className={styles.actionButton}>Edit</button>
          <span>
            <TrashIcon />
          </span>
        </div>
      ),
    },
  ];

  return (
    <Card title="Subscription Packages" className={styles.root}>
      <TableToolbar
        searchable={false}
        selectable={false}
        className={styles.tableToolbar}
        actions={
          <div className={styles.toolbarAction}>
            <p className={styles.buttonLabel}>New</p>
            <button className={styles.actionButton}>
              <Link to={newSubscPath}>New</Link>
            </button>
          </div>
        }
      />
      <TableBody
        columns={columns}
        rows={subsData}
        className={styles.tableBody}
      />
    </Card>
  );
}
