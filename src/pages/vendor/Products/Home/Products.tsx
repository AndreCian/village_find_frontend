import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { Card, TableBody } from '@/components/common';
import { Input, Select } from '@/components/forms';
import { TrashIcon } from '@/components/icons';

import { HttpService } from '@/services';
import { ITableColumn } from '@/interfaces';
import { SERVER_URL } from '@/config/global';
import { capitalizeFirstLetter } from '@/utils';

import styles from './Products.module.scss';

interface IProductItem {
  _id: string;
  name: string;
  sku?: string;
  inventory?: string;
  status: string;
}

const statusList = ['Active', 'Inactive', 'Delete'];

export function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProductItem[]>([]);

  const onStatusChange = (productId: string) => (value: string) => {
    HttpService.put(`/products/${productId}`, { status: value }).then(
      response => {
        const { status } = response;
        if (status === 200) {
          enqueueSnackbar(
            `Product status changed to ${capitalizeFirstLetter(value)}.`,
            { variant: 'success' },
          );
          setProducts(
            products.map((product: IProductItem) =>
              product._id === productId
                ? { ...product, status: value }
                : product,
            ),
          );
        }
      },
    );
  };

  const productsTableColumns: ITableColumn[] = [
    {
      title: 'Image',
      name: 'image',
      width: 100,
      cell: (row: any) => <img src={`${SERVER_URL}/${row.image}`} />,
    },
    {
      title: 'Product Name',
      name: 'name',
      width: 200,
    },
    {
      title: 'Product SKU',
      name: 'sku',
      width: 150,
    },
    {
      title: 'Inventory',
      name: 'inventory',
      width: 300,
      cell: (row: any) => (
        <div className={styles.inventCell}>
          <Input
            className={styles.input}
            rounded="full"
            type="number"
            value={row.inventory}
          />
          <button className={styles.button}>Update</button>
        </div>
      ),
    },
    {
      title: 'Status',
      name: 'status',
      width: 250,
      cell: (row: any) => (
        <Select
          rounded="full"
          bgcolor="white"
          border="solid"
          className={styles.statusSelect}
          options={statusList.map(item => ({
            name: item,
            value: item.toLowerCase(),
          }))}
          value={row.status.toLowerCase()}
          updateValue={onStatusChange(row._id)}
        />
      ),
    },
    {
      title: 'Action',
      name: 'action',
      width: 250,
      cell: (row: any) => (
        <div className={styles.actionCell}>
          <button className={styles.button} onClick={() => navigate(row._id)}>
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
    HttpService.get('/products/vendor').then(response => {
      setProducts(response);
    });
  }, []);

  return (
    <Card title="My Products" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.control}>
            <p>Product Name</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Product Name"
            />
          </div>
          <div className={styles.control}>
            <p>Product Id</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Product Id"
            />
          </div>
          <div className={styles.control}>
            <p>Product SKU</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Product SKU"
            />
          </div>
          <div className={styles.control}>
            <p>Sort By</p>
            <Select
              rounded="full"
              border="none"
              bgcolor="primary"
              placeholder="Sort By"
              className={styles.select}
            />
          </div>
          <div className={styles.buttonBar}>
            <button
              className={styles.button}
              onClick={() => navigate('create')}
            >
              New
            </button>
          </div>
        </div>
        <TableBody columns={productsTableColumns} rows={products} />
      </div>
    </Card>
  );
}
