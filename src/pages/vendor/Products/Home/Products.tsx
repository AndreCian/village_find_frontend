import { useNavigate } from 'react-router-dom';

import { Card, TableBody } from '@/components/common';
import { Input, Select } from '@/components/forms';
import { TrashIcon } from '@/components/icons';

import { useProductStore } from '@/stores/vendor/product';

import { ITableColumn } from '@/interfaces';

import styles from './Products.module.scss';

export function Products() {
  const navigate = useNavigate();
  const { products } = useProductStore();

  const productsTableColumns: ITableColumn[] = [
    {
      title: 'Image',
      name: 'image',
      width: 100,
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
          value={row.status}
          className={styles.statusSelect}
        />
      ),
    },
    {
      title: 'Action',
      name: 'action',
      width: 250,
      cell: (row: any) => (
        <div className={styles.actionCell}>
          <button className={styles.button}>Edit</button>
          <span>
            <TrashIcon />
          </span>
        </div>
      ),
    },
  ];

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
