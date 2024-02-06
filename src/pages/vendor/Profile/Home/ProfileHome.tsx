import { useEffect, useState } from 'react';

import {
  Business,
  Security,
  SocialMedia,
  Store,
  ShopOpen,
} from '@/components/vendor';

import styles from './ProfileHome.module.scss';

export function ProfileHome() {
  return (
    <div className={styles.root}>
      <Business />
      <Security />
      <SocialMedia />
      <Store />
      <ShopOpen isOpen={false} setOpen={() => {}} />
    </div>
  );
}
