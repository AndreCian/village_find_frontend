import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';

import { Card } from '@/components/common';

import PostImage from '/assets/vendor/backs/detail.png';
import styles from './Detail.module.scss';

const homePath = '/vendor/support';

export function SupportDetail() {
  const navigate = useNavigate();
  return (
    <Card className={styles.root}>
      <div className={styles.backImage}>
        <img src={PostImage} className={styles.backImage} />
        <span onClick={() => navigate(homePath)}>
          <FaChevronLeft />
        </span>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Ways to Grow Your Business</h1>
          <p>
            Topic: <span>Growth</span>
          </p>
        </div>
        <div className={styles.videoPlayer}></div>
        <p>
          What if local people were empowered to organize small makers and
          growers in their communities to help them connect with customers
          looking for what they're selling? Fresher Choice is making this
          possible through our Vendor Communities concept. We hand pick vendor
          organizers and provide a marketplace for their vendor community to
          list products and sell directly to their customers. It's a Fresher
          take on tech meets local. What if local people were empowered to
          organize small makers and growers in their communities to help them
          connect with customers looking for what they're selling? Fresher
          Choice is making this possible through our Vendor Communities concept.
          We hand pick vendor organizers and provide a marketplace for their
          vendor community to list products and sell directly to their
          customers. It's a Fresher take on tech meets local.
        </p>
      </div>
    </Card>
  );
}
