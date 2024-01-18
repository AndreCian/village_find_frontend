import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { TableToolbar, TableBody } from '@/components/common';
import { Select } from '@/components/forms';
import { TrashIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import { IPickupLocation, useFulfillStore } from '@/stores';

import styles from './PickupLocation.module.scss';

const statuses: string[] = ['Active', 'Passive'];

const newPath = '/vendor/profile/fulfillment/location/create';

export function PickupLocation() {
  const [filter, setFilter] = useState<string>('');
  const { pickupLocation } = useFulfillStore();

  const columns: ITableColumn[] = [
    {
      title: 'Location Name',
      name: 'name',
      width: 250,
    },
    {
      title: 'Location Address',
      name: 'address',
      width: 400,
    },
    {
      title: 'Status',
      name: 'status',
      width: 250,
      cell: (row: any) => (
        <Select
          rounded="full"
          value={row.status}
          options={statuses}
          className={styles.status}
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

  const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className={styles.root}>
      <TableToolbar
        search={filter}
        updateSearch={updateSearch}
        searchTitle="Search for a location"
        searchTitleHidden={true}
        selectable={false}
        className={styles.tableToolbar}
        actions={
          <div className={styles.actionPanel}>
            <button className={styles.actionButton}>
              <Link to={newPath}>New</Link>
            </button>
          </div>
        }
      />
      <TableBody
        columns={columns}
        rows={pickupLocation}
        className={styles.tableBody}
      />
    </div>
  );
}
