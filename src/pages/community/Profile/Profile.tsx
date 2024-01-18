import { ImageUpload, Input, TextField } from '@/components';

import styles from './Profile.module.scss';

export function Profile() {
  return (
    <div className={styles.root}>
      <h1>Profile</h1>
      <div className={styles.form}>
        <div className={styles.control}>
          <p className={styles.label}>Community Code*</p>
          <Input className={styles.input} />
        </div>
        <div className={styles.control}>
          <p className={styles.label}>Slug*</p>
          <Input className={styles.input} />
        </div>
        <div className={styles.control}>
          <ImageUpload
            exWidth={500}
            exHeight={500}
            labelEnhancer={(width: number, height: number) =>
              `Your Logo (${width}x${height})*`
            }
            className={styles.input}
          />
        </div>
        <div className={styles.control}>
          <ImageUpload
            exWidth={2400}
            exHeight={1000}
            labelEnhancer={(width: number, height: number) =>
              `Your Image (${width}x${height})*`
            }
            className={styles.input}
          />
        </div>
        <div className={styles.control}>
          <p className={styles.label}>About Short*</p>
          <TextField rows={5} className={styles.textarea} />
        </div>
        <div className={styles.control}>
          <p className={styles.label}>About Long*</p>
          <TextField rows={5} className={styles.textarea} />
        </div>
      </div>
      <button>Submit</button>
    </div>
  );
}
