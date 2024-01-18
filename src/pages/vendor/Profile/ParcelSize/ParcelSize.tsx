import { useNavigate } from 'react-router-dom';

import { Card, TableBody } from '@/components/common';
import { TrashIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import { useParcelStore } from '@/stores/vendor';

import styles from './ParcelSize.module.scss';

const newParcelPath = '/vendor/profile/parcel-size/create';

export function ParcelSize() {
  const navigate = useNavigate();
  const { parcels } = useParcelStore();
  const parcelSizeTableColumns: ITableColumn[] = [
    {
      title: 'Name',
      name: 'name',
      width: 100,
    },
    {
      title: 'Size (length x width x height)',
      name: 'size',
      width: 350,
      cell: (row: any) => (
        <span>{`${row.size.length.toFixed(2)} in x ${row.size.width.toFixed(
          2,
        )} in x ${row.size.height.toFixed(2)} in`}</span>
      ),
    },
    {
      title: 'Thickness',
      name: 'thickness',
      width: 150,
      cell: (row: any) => <span>{row.thickness.toFixed(2)} mm</span>,
    },
    {
      title: 'Max Weight',
      name: 'weight',
      width: 300,
      cell: (row: any) => <span>{row.weight.toFixed(2)} oz</span>,
    },
    {
      title: 'Action',
      name: 'action',
      width: 200,
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
    <Card title="Parcel Size" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.desc}>
            <p>
              The sizes you set here will be used to calculate shipping rates.
            </p>
            <p>
              All of your products must fit into atleast one of these parcels.
            </p>
          </div>
          <div className={styles.buttonBar}>
            <button
              className={styles.button}
              onClick={() => navigate(newParcelPath)}
            >
              New
            </button>
          </div>
        </div>
        <TableBody columns={parcelSizeTableColumns} rows={parcels} />
      </div>
    </Card>
  );
}
