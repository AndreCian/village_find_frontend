import { Card, TableToolbar } from '@/components/common';

import { formatNumber } from '@/utils';

import { CustomerChart, Select } from '@/components';
import { CurrentOrders } from '@/components/vendor';

import { IOrderRow, StatusType } from '@/stores';

import styles from './Financials.module.scss';

export function Financials() {
  const surveyData = {
    sales: 150258,
    transaction: 802,
    avgOrder: 108.98,
  };

  const earnings = [
    1810.28, 2011.81, 2005.4, 1910.38, 811.22, 1480.62, 1160.91,
  ];

  const transactions = 19;

  const orders: IOrderRow[] = [
    {
      id: 653,
      customer: 'Brandon Monti',
      type: 'Shipping',
      date: new Date('02/28/2024'),
      amount: 200.58,
      status: 'Paid' as StatusType,
    },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.survey}>
        <div className={styles.board}>
          <Card className={styles.card}>
            <div>
              <h3>Sales</h3>
              <p>Year to date</p>
            </div>
            <span className={styles.sales}>
              ${formatNumber(surveyData.sales)}
            </span>
          </Card>
          <Card className={styles.card}>
            <div>
              <h3>Transactions</h3>
              <p>Year to date</p>
            </div>
            <span className={styles.trans}>
              ${formatNumber(surveyData.transaction)}
            </span>
          </Card>
          <Card className={styles.card}>
            <div>
              <h3>Transactions</h3>
              <p>Year to date</p>
            </div>
            <span className={styles.avg}>
              ${surveyData.avgOrder.toFixed(2)}
            </span>
          </Card>
        </div>
        <Card className={styles.revenue}>
          <div className={styles.header}>
            <h1>Revenue</h1>
            <Select
              rounded="full"
              border="none"
              bgcolor="dark"
              placeholder="Week"
              className={styles.duration}
            />
          </div>
          <p>
            Number of Transactions <span>{transactions}</span>
          </p>
          <CustomerChart customers={earnings} />
        </Card>
      </div>
      <div className={styles.currentOrder}>
        <TableToolbar
          rangable={true}
          selectable={false}
          className={styles.toolBar}
        />
        <CurrentOrders title={true} data={orders} />
      </div>
    </div>
  );
}
