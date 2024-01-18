import { Steps } from '@/components/vendor';

import { SalesBoard } from '@/components/vendor/Dashboard/SalesBoard';
import { SyntheticTabs } from '@/components/vendor/Dashboard/SyntheticTabs';
import { CurrentOrders } from '@/components/vendor/Dashboard/CurrentOrders';

import { useDashStore, useProHomeStore } from '@/stores';

import styles from './Dashboard.module.scss';

export function Dashboard() {
  const { step, salesSurvey, activitySurvey, currentOrders } = useDashStore();
  const { isOpen } = useProHomeStore();

  return (
    <div className={styles.root}>
      {!isOpen && <Steps step={step} />}
      <div className={styles.surveyOrChart}>
        <SalesBoard sales={salesSurvey} />
        <SyntheticTabs survey={activitySurvey} />
      </div>
      <CurrentOrders data={currentOrders} />
    </div>
  );
}
