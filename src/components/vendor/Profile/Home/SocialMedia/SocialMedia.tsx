import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa6';
import clsx from 'clsx';

import { Card } from '@/components/common';
import { Input } from '@/components/forms';

import { ISocialMediaUrls } from '@/stores/vendor/profile/homeStore';

import styles from './SocialMedia.module.scss';
import { useState } from 'react';

export interface ISocialMediaProps {
  data: ISocialMediaUrls;
  className?: string;
}

export function SocialMedia({ className = '', data }: ISocialMediaProps) {
  const [socialMedia, setSocialMedias] = useState<ISocialMediaUrls>(data);

  return (
    <Card title="Social Media" className={clsx(styles.root, className)}>
      <div className={styles.container}>
        <p>Will be added to your story page</p>
        <div className={styles.form}>
          <div className={styles.control}>
            <span>
              <FaFacebookF fill="white" className={styles.icon} />
            </span>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="URL"
              className={styles.urlInput}
              disabled={false}
              value={socialMedia.facebook}
            />
          </div>
          <div className={styles.control}>
            <span>
              <FaTwitter fill="white" className={styles.icon} />
            </span>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="URL"
              className={styles.urlInput}
              disabled={false}
              value={socialMedia.twitter}
            />
          </div>
          <div className={styles.control}>
            <span>
              <FaInstagram fill="white" className={styles.icon} />
            </span>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="URL"
              className={styles.urlInput}
              disabled={false}
              value={socialMedia.instagram}
            />
          </div>
          <div className={styles.control}>
            <span>
              <FaFacebookF fill="white" className={styles.icon} />
            </span>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="URL"
              className={styles.urlInput}
              disabled={false}
              value={socialMedia.facebook}
            />
          </div>
          <div className={styles.control}>
            <span>
              <FaYoutube fill="white" className={styles.icon} />
            </span>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="URL"
              className={styles.urlInput}
              disabled={false}
              value={socialMedia.youtube}
            />
          </div>
          <div className={styles.control}>
            <span>
              <FaLinkedinIn fill="white" className={styles.icon} />
            </span>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="URL"
              className={styles.urlInput}
              disabled={false}
              value={socialMedia.linkedin}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
