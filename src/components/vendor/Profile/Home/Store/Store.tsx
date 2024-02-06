import { Card } from '@/components/common';
import { ImageUpload, Input, TagInput, TextField } from '@/components/forms';

import styles from './Store.module.scss';

export function Store() {
  return (
    <Card className={styles.root}>
      <div className={styles.container}>
        <div className={styles.store}>
          <h2>Store Information</h2>
          <div className={styles.form}>
            <div className={styles.horizon}>
              <div className={styles.control}>
                <p>Maximum Order Fulfillment Capacity</p>
                <Input
                  rounded="full"
                  border="none"
                  bgcolor="secondary"
                  placeholder="Maximum Order Fulfillment Capacity"
                  disabled={true}
                />
              </div>
              <div className={styles.control}>
                <p>Store Tags</p>
                <TagInput options={['Hand Mode', 'Wood Working']} />
              </div>
            </div>
            <div className={styles.control}>
              <p>
                Shop Short Description <span>48 Characters</span>
              </p>
              <TextField
                rows={2}
                rounded="full"
                border="none"
                bgcolor="secondary"
                className={styles.desc}
                placeholder="Shop Short Description"
              />
            </div>
            <div className={styles.control}>
              <p>Shop Long Description</p>
              <TextField
                rows={3}
                rounded="full"
                border="none"
                bgcolor="secondary"
                className={styles.desc}
                placeholder="Shop Long Description"
              />
            </div>
            <div className={styles.horizon}>
              <div className={styles.control}>
                <p className={styles.visible}>
                  Visible Radius In Miles <span>(for items sold near by)</span>
                </p>
                <Input
                  rounded="full"
                  border="none"
                  bgcolor="secondary"
                  placeholder="Miles"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.images}>
          <h2>Images</h2>
          <div className={styles.form}>
            <div className={styles.horizon}>
              <div className={styles.control}>
                <p>Logo</p>
                <ImageUpload exWidth={0} exHeight={0} rounded={true} />
              </div>
              <div className={styles.control}>
                <p>Store Finder</p>
                <ImageUpload
                  exWidth={350}
                  exHeight={175}
                  rounded={true}
                  labelEnhancer={(_width: number, _height: number) =>
                    `Best Resolution width by height ${_width} x ${_height}`
                  }
                />
              </div>
            </div>
            <div>
              <p className={styles.form}>Hero Image Slider</p>
              <div className={styles.horizon}>
                <div className={styles.control}>
                  <ImageUpload
                    exWidth={1920}
                    exHeight={390}
                    rounded={true}
                    labelEnhancer={(_width: number, _height: number) =>
                      `Best Resolution width by height ${_width} x ${_height}`
                    }
                  />
                </div>
                <div className={styles.control}>
                  <ImageUpload
                    exWidth={1920}
                    exHeight={390}
                    rounded={true}
                    labelEnhancer={(_width: number, _height: number) =>
                      `Best Resolution width by height ${_width} x ${_height}`
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
