import { useState, useMemo } from 'react';

import { Button } from '@/components/forms';
import { Rater } from '@/components/common';

import {
  ReviewListItem,
  WriteReview,
} from '@/components/customer/ProductDetails';

import { useWindowWidth } from '@/utils';

import styles from './AuthenticReviews.module.scss';

const initialReviews = [
  {
    rating: 5,
    reviewedAt: new Date('April 22, 2023'),
    title: 'April Cohen',
    body: "I mean it's really good but I would like a little bolder taste I am still drinking it though it's not a complaint just a helpful suggestion",
    isVerified: true,
  },
  {
    rating: 5,
    reviewedAt: new Date('April 22, 2023'),
    title: 'April Cohen',
    body: "I mean it's really good but I would like a little bolder taste I am still drinking it though it's not a complaint just a helpful suggestion",
    isVerified: true,
  },
  {
    rating: 5,
    reviewedAt: new Date('April 22, 2023'),
    title: 'April Cohen',
    body: "I mean it's really good but I would like a little bolder taste I am still drinking it though it's not a complaint just a helpful suggestion",
    isVerified: true,
  },
];

export function AuthenticReviews() {
  const [customRating] = useState(3.5);
  const [totalRatings] = useState<any[]>([
    {
      rating: 1,
      percent: 20,
    },
    {
      rating: 2,
      percent: 20,
    },
    {
      rating: 3,
      percent: 20,
    },
    {
      rating: 4,
      percent: 20,
    },
    {
      rating: 5,
      percent: 20,
    },
  ]);
  const [isReviewed, setIsReviewed] = useState(false);

  const onSwitchReview = () => {
    setIsReviewed(!isReviewed);
  };

  return (
    <div className={styles.root}>
      <p className={styles.head}>Authentic Member Reviews</p>
      <div className={styles.reviewBar}>
        <div className={styles.customer}>
          <div className={styles.rating}>
            <Rater rating={customRating} />
            <p>{customRating} out of 5</p>
          </div>
          <p className={styles.text}>Out of 100 customers</p>
        </div>
        <div className={styles.total}>
          {totalRatings.map((item: any, index: number) => (
            <div key={index} className={styles.reviewItem}>
              <Rater rating={item.rating} />
              <div className={styles.progress}>
                <div
                  style={{ width: `${item.percent}%` }}
                  className={styles.loading}
                ></div>
              </div>
              <p>{item.percent}</p>
            </div>
          ))}
        </div>
        <div className={styles.button}>
          <Button className={styles.cancelBtn} onClick={onSwitchReview}>
            {isReviewed ? 'Cancel Review' : 'Write Review'}
          </Button>
        </div>
      </div>
      <div className={styles.writeReview}>
        <WriteReview />
      </div>
      <div className={styles.reviewList}>
        <div className={styles.reviews}>
          {initialReviews.map((review: any, index: number) => (
            <ReviewListItem key={index} {...review} />
          ))}
        </div>
        <Button className={styles.loadBtn}>Load More</Button>
      </div>
    </div>
  );
}
