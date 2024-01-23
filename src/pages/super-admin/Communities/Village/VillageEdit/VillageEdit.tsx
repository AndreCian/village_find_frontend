import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { Card, Input, TableBody } from '@/components';

import { HttpService } from '@/services';

import { ITableColumn } from '@/interfaces';

import { formatDate, getBubbleObject } from '@/utils';

import styles from './VillageEdit.module.scss';

type PayStatus = 'Paid' | 'Unpaid';

export interface ICommunity {
  name: string;
  email: string;
  password: string;
  code: string;
  organizer: {
    firstName: string;
    lastName: string;
  };
}

export interface ICommission {
  date: Date;
  total: number;
  status: PayStatus;
}

export interface IStatis {
  count: number;
  total: number;
}

const initialCommunity: ICommunity = {
  name: '',
  email: '',
  password: '',
  code: '',
  organizer: {
    firstName: '',
    lastName: '',
  },
};

const initialStatis: IStatis = {
  count: 234,
  total: 40,
};

const commissionTableColumns: ITableColumn[] = [
  {
    title: 'Commission Date',
    name: 'date',
    width: 350,
    cell: (row: any) => <span>{formatDate(row.date)}</span>,
  },
  {
    title: 'Total Earned',
    name: 'total',
    width: 450,
    cell: (row: any) => <span>${row.total.toFixed(2)}</span>,
  },
  {
    title: 'Status',
    name: 'status',
    width: 150,
    cell: (row: any) => (
      <span
        className={clsx(
          styles.statusSpan,
          row.status === 'Paid' ? styles.paid : styles.unpaid,
        )}
      >
        {row.status}
      </span>
    ),
  },
];

const commissionTableRows: ICommission[] = [
  {
    date: new Date('04/22/2023'),
    total: 20,
    status: 'Paid',
  },
  {
    date: new Date('04/22/2023'),
    total: 20,
    status: 'Unpaid',
  },
];

const backToHomePath = '/admin/community/village';

export function VillageEdit() {
  const navigate = useNavigate();
  const { id: communityId } = useParams();

  const [community, setCommunity] = useState<ICommunity>(initialCommunity);
  const [statis, setStatis] = useState<IStatis>(initialStatis);

  const onCommunityChange = (e: any) => {
    setCommunity(getBubbleObject(e.target.name, community, e.target.value));
  };

  const onUpdateClick = () => {
    if (!!communityId === false) return;
    if (communityId === 'create') {
      HttpService.post('/communities', community).then(response => {
        if (response) {
          enqueueSnackbar(`${community.name} community added successfully!`, {
            variant: 'success',
          });
          navigate(backToHomePath);
        }
      });
    } else {
      HttpService.put(`/communities/${communityId}`, community).then(
        response => {
          if (response) {
            enqueueSnackbar(
              `${community.name} community updated successfully!`,
              {
                variant: 'success',
              },
            );
            navigate(backToHomePath);
          }
        },
      );
    }
  };

  useEffect(() => {
    if (!!communityId === false || communityId === 'create') return;
    HttpService.get(`/communities/${communityId}`).then(response => {
      const result = response || initialCommunity;
      setCommunity(result);
    });
  }, [communityId]);

  return (
    <div className={styles.root}>
      <button
        className={styles.backButton}
        onClick={() => navigate(backToHomePath)}
      >
        Back
      </button>
      <Card title="Village Community" className={styles.communitySection}>
        <div className={styles.container}>
          <div className={styles.control}>
            <p className={styles.label}>Associated with an existing vendor</p>
            <Input placeholder="Search Vendor Name, Email, Phone" />
          </div>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p className={styles.label}>Village Name</p>
              <Input
                name="name"
                placeholder="Village Name"
                value={community.name}
                updateValue={onCommunityChange}
              />
            </div>
            <div className={styles.control}>
              <p className={styles.label}>Password</p>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={community.password}
                updateValue={onCommunityChange}
              />
            </div>
          </div>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p className={styles.label}>Organizer First Name</p>
              <Input
                name="organizer.firstName"
                placeholder="First Name"
                value={community.organizer && community.organizer.firstName}
                updateValue={onCommunityChange}
              />
            </div>
            <div className={styles.control}>
              <p className={styles.label}>Email</p>
              <Input
                name="email"
                placeholder="Email"
                value={community.email}
                updateValue={onCommunityChange}
              />
            </div>
          </div>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p className={styles.label}>Organizer Last Name</p>
              <Input
                name="organizer.lastName"
                placeholder="Last Name"
                value={community.organizer && community.organizer.lastName}
                updateValue={onCommunityChange}
              />
            </div>

            <div className={styles.control}>
              <p className={styles.label}>Code</p>
              <Input
                name="code"
                placeholder="Code"
                value={community.code}
                updateValue={onCommunityChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonBar}>
          <button
            className={styles.cancelButton}
            onClick={() => navigate(backToHomePath)}
          >
            Cancel
          </button>
          <button className={styles.addButton} onClick={onUpdateClick}>
            {communityId === 'create' ? 'Add' : 'Update'}
          </button>
        </div>
      </Card>
      {communityId !== 'create' && (
        <div className={styles.statisSection}>
          <Card className={styles.subStatis}>
            <p>Vendor Count</p>
            <p>{statis.count}</p>
          </Card>
          <Card className={styles.subStatis}>
            <p>Total Commission</p>
            <p>${statis.total.toFixed(2)}</p>
          </Card>
        </div>
      )}
      {communityId !== 'create' && (
        <Card title="Commission">
          <TableBody
            columns={commissionTableColumns}
            rows={commissionTableRows}
          />
        </Card>
      )}
    </div>
  );
}
