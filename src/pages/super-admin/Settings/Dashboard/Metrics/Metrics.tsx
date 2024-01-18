import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { Card, TableToolbar, TableBody } from '@/components/common';
import { Select } from '@/components/forms';
import { TrashIcon } from '@/components/icons';

import { MetricService } from '@/services';

import { useMetricStore } from '@/stores';

import { ITableColumn, IMetric } from '@/interfaces';

import styles from './Metrics.module.scss';

const initialStatus: string[] = ['Active', 'Inactive'];

const metricPathPrefix = '/admin/settings/dashboard/metrics';

export function Metrics() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const {
    metrics: storeMetrics,
    setMetrics: setStoreMetrics,
    deleteMetric: deleteStoreMetric,
  } = useMetricStore();

  const columns: ITableColumn[] = [
    {
      title: 'Metric Name',
      name: 'name',
      width: 250,
    },
    {
      title: 'Status',
      name: 'status',
      width: 250,
      cell: (row: any) => (
        <Select
          rounded="full"
          placeholder={row.status}
          // options={initialStatus}
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
            onClick={onClickEdit(row._id)}
          >
            Edit
          </button>
          <span onClick={onClickDelete(row._id)}>
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

  const onClickEdit = (id: string) => () => {
    navigate(`${metricPathPrefix}/${id}`);
  };

  const onClickDelete = (id: string) => () => {
    MetricService.deleteOne(id)
      .then(() => {
        enqueueSnackbar('Metric deleted successfully!');
        deleteStoreMetric(id);
      })
      .catch(err => {
        enqueueSnackbar('Error occured!', { variant: 'error' });
      });
  };

  useEffect(() => {
    MetricService.findAll(filter, category).then(metrics => {
      setStoreMetrics(metrics);
    });
  }, [filter, category]);

  return (
    <Card title="Metrics" className={styles.root}>
      <TableToolbar
        search={filter}
        updateSearch={updateFilter}
        searchTitle="Metric Name"
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
              onClick={() => navigate(`${metricPathPrefix}/create`)}
            >
              New
            </button>
          </div>
        }
      />
      <TableBody
        columns={columns}
        rows={storeMetrics}
        className={styles.tableBody}
      />
    </Card>
  );
}
