import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { Card, TableBody, TableToolbar } from '@/components';
import { Select } from '@/components/forms';
import { TrashIcon } from '@/components/icons';

import { useCustomerStore } from '@/stores';

import { CustomerService } from '@/services';

import { IRange, ITableColumn } from '@/interfaces';

import styles from './CustomerHome.module.scss';

const initialSort = ['Alphabetical Order', 'Most Recent', 'Oldest'];

const initialStatus = ['Active', 'Inactive'];

const initialRange = {
  from: '',
  to: '',
};

const customerPathPrefix = '/admin/customers/home';

export function CustomerHome() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [range, setRange] = useState<IRange>(initialRange);
  const {
    customers: storeCustomers,
    setCustomers: setStoreCustomers,
    deleteCustomer: deleteStoreCustomer,
  } = useCustomerStore();

  const columns: ITableColumn[] = [
    {
      title: 'Customer Name',
      name: 'name',
      width: 200,
      cell: (row: any) => (
        <span className={styles.cell}>
          {row.firstName} {row.lastName}
        </span>
      ),
    },
    {
      title: 'Email',
      name: 'email',
      width: 200,
      cell: (row: any) => <span className={styles.cell}>{row.email}</span>,
    },
    {
      title: 'Status',
      name: 'status',
      cell: (row: any) => (
        <Select
          rounded="full"
          value={row.status}
          options={['Active', 'Inactive']}
          className={styles.statusSelector}
        />
      ),
    },
    {
      title: 'Phone Number',
      name: 'phone',
      width: 200,
      cell: (row: any) => <span className={styles.cell}>{row.phone}</span>,
    },
    {
      title: 'Address',
      name: 'address',
      width: 200,
      cell: (row: any) => <span className={styles.cell}>{row.address}</span>,
    },
    {
      title: 'Action',
      name: 'action',
      width: 250,
      cell: (row: any) => (
        <div className={styles.actionCell}>
          <button
            className={styles.actionButton}
            onClick={() => navigate(`${customerPathPrefix}/${row._id}`)}
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

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const onRangeChange =
    (which: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setRange({ ...range, [which]: e.target.value });
    };

  const onDeleteClick = (id: string) => () => {
    CustomerService.deleteOne(id)
      .then(() => {
        deleteStoreCustomer(id);
        enqueueSnackbar('Customer deleted successfully!', {
          variant: 'success',
        });
      })
      .catch(err => {
        enqueueSnackbar('Error occured!', { variant: 'error' });
      });
  };

  const onSubmitClick = () => {
    CustomerService.findAll(filter, category)
      .then(customers => {
        setStoreCustomers(customers);
      })
      .catch(err => {
        enqueueSnackbar('Error occured!', { variant: 'error' });
      });
  };

  const onResetClick = () => {
    setFilter('');
    setCategory('');
    setSort('');
    setRange({
      from: '',
      to: '',
    });
  };

  useEffect(() => {
    CustomerService.findAll(filter, category)
      .then(customers => {
        setStoreCustomers(customers);
      })
      .catch(err => {
        enqueueSnackbar('Error occured!', { variant: 'error' });
      });
  }, []);

  return (
    <Card title="Customer Management" className={styles.root}>
      <TableToolbar
        searchTitle="Search Customer Name"
        search={filter}
        updateSearch={onFilterChange}
        rangable={true}
        range={range}
        updateRange={onRangeChange}
        downloadable={true}
        sortable={true}
        sortOpts={initialSort}
        sort={sort}
        updateSort={(_sort: string) => setSort(_sort)}
        selectTitle="Status"
        selectOpts={initialStatus}
        category={category}
        updateCategory={(_cat: string) => setCategory(_cat)}
        className={styles.tableToolbar}
        actions={
          <div className={styles.actions}>
            <div>
              <p>Submit</p>
              <button
                className={clsx(styles.button, styles.submit)}
                onClick={onSubmitClick}
              >
                Submit
              </button>
            </div>
            <div>
              <p>Reset</p>
              <button
                className={clsx(styles.button, styles.reset)}
                onClick={onResetClick}
              >
                Reset
              </button>
            </div>
          </div>
        }
      />
      <TableBody
        columns={columns}
        rows={storeCustomers}
        className={styles.tableBody}
      />
    </Card>
  );
}
