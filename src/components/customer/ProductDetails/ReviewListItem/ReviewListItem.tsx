import { Rater } from '@/components/common';

import styles from './ReviewLIstItem.module.scss';

interface IReviewListItemProps {
  rating: number;
  reviewedAt: Date;
  title: string;
  body: string;
  isVerified: boolean;
}

export function ReviewListItem({
  rating,
  reviewedAt,
  title,
  body,
  isVerified,
}: IReviewListItemProps) {
  return (
    <div className={styles.root}>
      <div className={styles.symbol}>
        <Rater rating={rating} />
        <p>
          {reviewedAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className={styles.profile}>
        <span className={styles.avatar}>
          <img src="/assets/customer/svgs/review.svg" />
        </span>
        <div className={styles.text}>
          <div className={styles.title}>
            <p>{title}</p>
            <span>{isVerified ? 'Verified Review' : ''}</span>
          </div>
          <p className={styles.body}>{body}</p>
        </div>
      </div>
    </div>
  );
}
