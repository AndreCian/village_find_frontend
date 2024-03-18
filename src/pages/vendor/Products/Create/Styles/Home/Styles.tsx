import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TableBody } from '@/components/common';
import { Input, Select } from '@/components/forms';
import { GridIcon, TrashIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

// import { useStyleStore } from '@/stores/vendor';

import styles from './Styles.module.scss';
import { HttpService } from '@/services';

const subPath = '/vendor/products';

interface IStyle {
  _id: string;
  name: string;
  discount: number;
  status: string;
}

export function Styles() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [productStyles, setProductStyles] = useState<IStyle[]>([]);

  const onEditClick = (id: string) => () => {
    navigate(id);
  };

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
          <button className={styles.button} onClick={onEditClick(row._id)}>
            Edit
          </button>
          <span>
            <TrashIcon />
          </span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    HttpService.get(`/products/${productId}/style`).then(response => {
      const { status, styles } = response;
      if (status === 200) {
        setProductStyles(styles);
      } else {
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttonBar}>
        <button
          className={styles.button}
          onClick={() => navigate(`${subPath}/${productId}/style/create`)}
        >
          New
        </button>
      </div>
      <TableBody columns={stylesTableColumns} rows={productStyles} />
    </div>
  );
}
