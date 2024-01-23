import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Card, TableBody, TableToolbar } from '@/components';
import { Input, Select } from '@/components/forms';

import { HttpService } from '@/services';

import { IRange, ITableColumn } from '@/interfaces';

import { formatDate } from '@/utils';

import styles from './Village.module.scss';

const sortOpts = [
  'Alphabetical Order',
  'Recently Added',
  'Highest Revenue',
  'Lowest Revenue',
];
const statusOpts = ['Active', 'Blocked', 'Paused', 'Inactive'];

const initialRange = {
  from: '',
  to: '',
};

type StatusType = 'Active' | 'Blocked' | 'Paused' | 'Inactive';

export interface ICommunityRow {
  name: string;
  organizer: string;
  date: Date;
  total: number;
  status: StatusType;
}

const initialTableData: ICommunityRow[] = [];

const communityViewPath = '/admin/community/village';

export function VillageCommunity() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [range, setRange] = useState<IRange>(initialRange);
  const [tableData, setTableData] = useState(initialTableData);

  const columns: ITableColumn[] = [
    {
      title: 'Village Name',
      name: 'name',
      width: 150,
    },
    {
      title: 'Village Organizer',
      name: 'organizer',
      width: 150,
      cell: (row: any) => (
        <span>
          {row.organizer &&
            `${row.organizer.firstName} ${row.organizer.lastName}`}
        </span>
      ),
    },
    {
      title: 'Signup Date',
      name: 'signup_at',
      width: 150,
      cell: (row: any) => (
        <Input
          type="text"
          rounded="full"
          value={formatDate(new Date(row.signup_at))}
        />
      ),
    },
    {
      title: 'Total Vendors',
      name: 'total',
      width: 150,
      cell: (row: any) => <span>{row.total || 0}</span>,
    },
    {
      title: 'Status',
      name: 'status',
      width: 200,
      cell: (row: any) => (
        <Select
          rounded="full"
          value={row.status}
          options={statusOpts}
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
          <button
            className={styles.actionButton}
            onClick={() => navigate(`${communityViewPath}/${row._id}`)}
          >
            View
          </button>
        </div>
      ),
    },
  ];

  const loadCommunities = () => {
    HttpService.get('/communities', {
      name: filter,
      order: sort,
      status: category,
      from: range.from,
      to: range.to,
    }).then(response => {
      const result = response || initialTableData;
      setTableData(result);
    });
  };

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const onRangeChange =
    (which: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setRange({ ...range, [which]: e.target.value });
    };

  const onSubmitClick = () => {
    loadCommunities();
  };

  const onResetClick = () => {
    setFilter('');
    setSort('');
    setCategory('');
    setRange(initialRange);
  };

  useEffect(() => {
    loadCommunities();
  }, []);

  return (
    <Card title="Village Communities" className={styles.root}>
      <TableToolbar
        searchTitle="Search Shop Owner or Vendor Name"
        search={filter}
        updateSearch={onFilterChange}
        rangable={true}
        range={range}
        updateRange={onRangeChange}
        downloadable={true}
        sortable={true}
        sortOpts={sortOpts}
        sort={sort}
        updateSort={(_sort: string) => setSort(_sort)}
        selectTitle="Status"
        selectOpts={statusOpts}
        category={category}
        updateCategory={(_cat: string) => setCategory(_cat)}
        className={styles.tableToolbar}
        actions={
          <div className={styles.actions}>
            <div className={styles.submitButtons}>
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
            <div>
              <p>New</p>
              <button
                className={clsx(styles.button, styles.new)}
                onClick={() => navigate(`${communityViewPath}/create`)}
              >
                New
              </button>
            </div>
          </div>
        }
      />
      <TableBody
        columns={columns}
        rows={tableData}
        className={styles.tableBody}
      />
    </Card>
  );
}
