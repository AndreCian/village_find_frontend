import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, TableToolbar, TableBody } from '@/components/common';
import { Select } from '@/components/forms';
import { TrashIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import { useCouponStore } from '@/stores';

import { CouponService } from '@/services';

import styles from './Coupons.module.scss';
import { enqueueSnackbar } from 'notistack';

const initialStatus: string[] = ['Active', 'Inactive'];

const couponPathPrefix = '/admin/customers/coupon';

export function Coupons() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const {
    coupons: storeCoupons,
    setCoupons: setStoreCoupons,
    deleteCoupon: deleteStoreCoupon,
  } = useCouponStore();

  const columns: ITableColumn[] = [
    {
      title: 'Coupon Name',
      name: 'code',
      width: 250,
      cell: (row: any) => (
        <div>{row.code || (row.usage && row.usage.code)}</div>
      ),
    },
    {
      title: 'Type',
      name: 'type',
      width: 250,
    },
    {
      title: 'Status',
      name: 'status',
      width: 250,
      cell: (row: any) => (
        <Select
          rounded="full"
          value={row.status}
          options={[]}
          className={styles.statusSelector}
        />
      ),
    },
    {
      title: 'Discount',
      name: 'discount',
      width: 250,
      cell: (row: any) => <div>{row.discount ? `${row.discount}%` : ''}</div>,
    },
    {
      title: 'Action',
      name: 'action',
      width: 250,
      cell: (row: any) => (
        <div className={styles.actionCell}>
          <button
            className={styles.actionButton}
            onClick={() => navigate(`${couponPathPrefix}/${row._id}`)}
          >
            Edit
          </button>
          <span onClick={onDeleteClick(row._id)}>
            <TrashIcon />
          </span>
        </div>
      ),
    },
  ];

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const updateStatus = (_category: string) => {
    setCategory(_category);
  };

  const onDeleteClick = (id: string) => () => {
    CouponService.deleteOne(id).then(response => {
      if (response) {
        deleteStoreCoupon(id);
        enqueueSnackbar(`Coupon ${id} deleted successfully!`, {
          variant: 'success',
        });
      }
    });
  };

  useEffect(() => {
    CouponService.findAll(filter, category).then(coupons => {
      setStoreCoupons(coupons);
    });
  }, [filter, category]);

  return (
    <Card title="Coupon Center" className={styles.root}>
      <TableToolbar
        search={filter}
        updateSearch={updateFilter}
        searchTitle="Coupon Name"
        category={category}
        updateCategory={updateStatus}
        selectTitle="Status"
        selectOpts={initialStatus}
        className={styles.tableToolbar}
        actions={
          <div>
            <p className={styles.buttonLabel}>New</p>
            <button
              className={styles.actionButton}
              onClick={() => navigate(`${couponPathPrefix}/create`)}
            >
              New
            </button>
          </div>
        }
      />
      <TableBody
        columns={columns}
        rows={storeCoupons}
        className={styles.tableBody}
      />
    </Card>
  );
}
