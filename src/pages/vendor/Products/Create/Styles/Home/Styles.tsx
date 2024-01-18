import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';

import { Card, TableBody } from '@/components/common';
import { Input, Select } from '@/components/forms';
import { GridIcon, TrashIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import { useStyleStore } from '@/stores/vendor';

import styles from './Styles.module.scss';

const styleCreatePath = '/vendor/products/create/style/create';

export function Styles() {
  const navigate = useNavigate();
  const { styles: productStyles } = useStyleStore();
  const stylesTableColumns: ITableColumn[] = [
    {
      title: 'Style Name',
      name: 'name',
      width: 150,
      cell: (row: any) => (
        <div className={styles.name}>
          <GridIcon />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      title: 'Discount',
      name: 'discount',
      width: 400,
      cell: (row: any) => (
        <Input
          rounded="full"
          placeholder="Discount"
          adornment={{
            position: 'right',
            content: '%',
          }}
          className={styles.discount}
        />
      ),
    },
    {
      title: 'Status',
      name: 'status',
      width: 150,
      cell: (row: any) => (
        <Select placeholder="Active" rounded="full" className={styles.status} />
      ),
    },
    {
      title: 'Action',
      name: 'action',
      width: 250,
      cell: (row: any) => (
        <div className={styles.action}>
          <button className={styles.button}>Edit</button>
          <span>
            <TrashIcon />
          </span>
        </div>
      ),
    },
  ];

  return (
    <Card className={styles.root}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <p>My Products</p>
          <FaChevronRight className={styles.arrow} />
          <span>Product Styles</span>
        </div>
        <div className={styles.variant}>
          <p>
            <span>Products Name:</span> Black Polish Radish
          </p>
        </div>
        <div className={styles.buttonBar}>
          <button
            className={styles.button}
            onClick={() => navigate(styleCreatePath)}
          >
            New
          </button>
        </div>
        <TableBody columns={stylesTableColumns} rows={productStyles} />
      </div>
    </Card>
  );
}
