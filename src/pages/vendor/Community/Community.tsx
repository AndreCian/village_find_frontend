import { Card, Select } from '@/components';

import ArtisanImg from '/assets/vendor/backs/artisan.png';
import styles from './Community.module.scss';

export function Community() {
  return (
    <Card title="Community" className={styles.root}>
      <div className={styles.artisan}>
        <img src={ArtisanImg} className={styles.image} />
        <p>Field Of Artisans</p>
        <Select rounded="full" placeholder="Active" className={styles.select} />
      </div>
    </Card>
  );
}
