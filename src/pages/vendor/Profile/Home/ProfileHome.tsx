import { useState } from 'react';

import { Business, Security, SocialMedia, Store } from '@/components/vendor';
import { ShopOpen } from '@/components/vendor/Profile/Home/ShopOpen/ShopOpen';

import { useProHomeStore } from '@/stores/vendor/profile/homeStore';

import styles from './ProfileHome.module.scss';

export interface IBusiness {
  name: string;
  phone: string;
  owner: string;
  address: string;
  email: string;
  zipcode: string;
}

export interface ISocialMediaUrls {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
}

const initialBusiness: IBusiness = {
  name: '',
  phone: '',
  owner: '',
  address: '',
  email: '',
  zipcode: '',
};

const initialSocialUrls: ISocialMediaUrls = {
  facebook: 'http://facebook.com',
  twitter: 'http://twitter.com',
  instagram: 'http://instagram.com',
  youtube: 'http://youtube.com',
  linkedin: 'http://linkedin.com',
};

export function ProfileHome() {
  // const { business, socialUrls, isOpen, setOpen } = useProHomeStore();

  const [business, setBusiness] = useState<IBusiness>(initialBusiness);
  const [socialUrls, setSocialUrls] =
    useState<ISocialMediaUrls>(initialSocialUrls);
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <div className={styles.root}>
      <Business data={business} setData={setBusiness} />
      <Security />
      <SocialMedia data={socialUrls} />
      <Store />
      <ShopOpen isOpen={isShopOpen} setOpen={setIsShopOpen} />
    </div>
  );
}
