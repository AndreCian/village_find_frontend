import { ChangeEvent, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Card } from '@/components/common';
import { Input, Select } from '@/components/forms';

import { MetricService } from '@/services';

import { useMetricStore } from '@/stores';

import { IMetric } from '@/interfaces';

import styles from './NewMetric.module.scss';
import { enqueueSnackbar } from 'notistack';

const initialMetric: IMetric = {
  name: '',
  status: '',
};
const initialStatus: string[] = ['Active', 'Inactive'];

const backToPath = '/admin/settings/dashboard/metrics';

export function NewMetric() {
  const { id: metricId }: any = useParams();
  const navigate = useNavigate();
  const [metric, setMetric] = useState<IMetric>(initialMetric);
  const { updateMetric: updateStoreMetric } = useMetricStore();

  const updateMetricName = (e: ChangeEvent<HTMLInputElement>) => {
    setMetric({ ...metric, name: e.target.value });
  };

  const updateMetricStatus = (status: string) => {
    setMetric({ ...metric, status });
  };

  const onMetricCreate = () => {
    if (metricId === 'create') {
      MetricService.createOne(metric)
        .then(metric => {
          enqueueSnackbar('New metric added successfully!', {
            variant: 'success',
          });
          navigate(backToPath);
        })
        .catch(err => {
          enqueueSnackbar('Error occured!', { variant: 'error' });
        });
    } else {
      MetricService.updateOne(metricId, metric)
        .then(metric => {
          enqueueSnackbar('Metric updated successfully!', { variant: 'error' });
          updateStoreMetric(metricId, metric);
          navigate(backToPath);
        })
        .catch(err => {
          enqueueSnackbar('Error occured!', { variant: 'error' });
        });
    }
  };

  useEffect(() => {
    if (!metricId || metricId === 'create') {
      setMetric(initialMetric);
    } else {
      MetricService.findOne(metricId).then(metric => {
        setMetric(metric);
      });
    }
  }, [metricId]);

  return (
    <Card title="New Metric" className={styles.root}>
      <div className={styles.form}>
        <div className={styles.control}>
          <p>Metric Name</p>
          <Input
            value={metric.name}
            updateValue={updateMetricName}
            placeholder="Metric Name"
          />
        </div>
        <div className={styles.control}>
          <p>Status</p>
          <Select
            value={metric.status}
            updateValue={updateMetricStatus}
            placeholder="Status"
            options={initialStatus}
          />
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button
          className={styles.cancelButton}
          onClick={() => navigate(backToPath)}
        >
          Cancel
        </button>
        <button className={styles.addButton} onClick={onMetricCreate}>
          {metricId === 'create' ? 'Add' : 'Edit'}
        </button>
      </div>
    </Card>
  );
}
