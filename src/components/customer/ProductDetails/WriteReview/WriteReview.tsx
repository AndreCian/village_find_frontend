import { useState } from 'react';
import clsx from 'clsx';

import { Button, Input, TextField } from '@/components/forms';
import { Rater } from '@/components/common';

import styles from './WriteReview.module.scss';

export function WriteReview() {
  const [rating, setRating] = useState(5);

  return (
    <div className={styles.root}>
      <p className={styles.head}>Write A Review</p>
      <div className={styles.rating}>
        <p className={styles.text}>Rating</p>
        <Rater rating={rating} iconSize={30} />
      </div>

      <div className={clsx(styles.formElement, styles.title)}>
        <p className={styles.text}>Review Title</p>
        <Input placeholder="Review Title" className={styles.titleInput} />
      </div>
      <div className={clsx(styles.formElement, styles.body)}>
        <p className={styles.text}>Review Body</p>
        <TextField
          rows={3}
          placeholder="Review Body"
          className={styles.bodyInput}
        />
      </div>
      <div className={styles.buttons}>
        <Button className={clsx(styles.button, styles.submitBtn)}>
          Submit
        </Button>
        <Button className={clsx(styles.button, styles.cancelBtn)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
