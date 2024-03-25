import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { TableBody } from '@/components/common';
import { Input, Select } from '@/components/forms';
import { GridIcon, TrashIcon } from '@/components/icons';

import { ChangeInputEvent, ITableColumn } from '@/interfaces';
import { HttpService } from '@/services';

import styles from './Styles.module.scss';

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

  const onDiscountChange = (id: string) => (e: ChangeInputEvent) => {
    setProductStyles(
      productStyles.map((style: IStyle) =>
        style._id === id
          ? { ...style, discount: Number(e.target.value) }
          : style,
      ),
    );
  };

  const onDiscountUpdateClick = (styleId: string) => () => {
    const style = productStyles.find((style: IStyle) => style._id === styleId);
    HttpService.put(`/styles/${styleId}/discount`, {
      discount: style?.discount || 0,
    }).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('Discount updated!', { variant: 'success' });
      }
    });
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
        <div className={styles.discountCell}>
          <Input
            type="number"
            rounded="full"
            placeholder="Discount"
            adornment={{
              position: 'right',
              content: '%',
            }}
            className={styles.discount}
            value={row.discount}
            updateValue={onDiscountChange(row._id)}
          />
          <button
            className={styles.button}
            onClick={onDiscountUpdateClick(row._id)}
          >
            Update
          </button>
        </div>
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
    HttpService.get('/styles/vendor', { productId }).then(response => {
      const { status, styles } = response;
      if (status === 200) {
        setProductStyles(styles);
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
