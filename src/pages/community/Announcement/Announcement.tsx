import { TextField } from '@/components/forms';

import styles from './Announcement.module.scss';

export function Announcement() {
  const updatedAt = new Date();

  const formatDate = (updatedAt: Date) => {
    return updatedAt.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: 'numeric',
    });
  };

  return (
    <div className={styles.root}>
      <h1>Announcement</h1>
      <div>
        <p>Last updated: {formatDate(updatedAt)}</p>
        <div className={styles.control}>
          <p className={styles.label}>Announcement</p>
          <TextField rows={3} className={styles.textarea} />
        </div>
      </div>
      <button>Submit</button>
    </div>
  );
}
