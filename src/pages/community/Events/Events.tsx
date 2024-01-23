import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Dropdown } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';
import { Card, TableBody } from '@/components/common';

import { ITableColumn } from '@/interfaces';

import { formatUsDate } from '@/utils';

import styles from './Events.module.scss';
import { HttpService } from '@/services';
import { enqueueSnackbar } from 'notistack';

const initialActions = [
  {
    name: 'Export',
    children: [
      {
        name: 'Pdf',
      },
      {
        name: 'Excel',
      },
    ],
  },
  {
    name: 'Print',
  },
];

export function Events() {
  const navigate = useNavigate();

  const eventColumns: ITableColumn[] = [
    {
      title: 'Event Name',
      name: 'name',
      width: 180,
      cell: (row: any) => <div className={styles.eventCell}>{row.name}</div>,
    },
    {
      title: 'Event Date',
      name: 'date',
      width: 150,
      cell: (row: any) => (
        <div className={styles.eventCell}>
          {row.fulfillment && formatUsDate(new Date(row.fulfillment.date))}
        </div>
      ),
    },
    {
      title: 'Attending',
      name: 'attending',
      width: 160,
      cell: (row: any) => (
        <div className={styles.eventCell}>
          {(row.attendees && row.attendees.length) ?? 0}
        </div>
      ),
    },
    {
      title: 'Status',
      name: 'status',
      width: 200,
      cell: (row: any) => <div className={styles.eventCell}>{row.status}</div>,
    },
    {
      title: 'Where',
      name: 'address',
      width: 250,
      cell: (row: any) => <div className={styles.eventCell}>{row.address}</div>,
    },
    {
      title: 'Details',
      name: 'details',
      width: 120,
      cell: (row: any) => (
        <Button className={styles.viewButton} onClick={() => navigate(row._id)}>
          View
        </Button>
      ),
    },
  ];

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    HttpService.get('/communities/event')
      .then(response => {
        setEvents(response);
      })
      .catch(err => {
        enqueueSnackbar('Something went wrong with server.', {
          variant: 'success',
        });
      });
  }, []);

  return (
    <div className={styles.root}>
      <h1>Events</h1>
      <div className={styles.content}>
        <div className={styles.header}>
          <Input
            placeholder="Search"
            className={styles.input}
            rounded="full"
            border="none"
            adornment={{
              position: 'right',
              content: <MagnifierIcon />,
            }}
          />
          <div className={styles.actions}>
            <Button
              className={styles.newButton}
              onClick={() => navigate('create')}
            >
              New Event
            </Button>
            <Dropdown routes={initialActions} position="right">
              Actions
            </Dropdown>
          </div>
        </div>
        <Card className={styles.body}>
          <TableBody columns={eventColumns} rows={events} />
        </Card>
      </div>
    </div>
  );
}
