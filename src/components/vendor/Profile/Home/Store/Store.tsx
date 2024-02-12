import { useEffect, useState } from 'react';

import { Card } from '@/components/common';
import { ImageUpload, Input, TagInput, TextField } from '@/components/forms';

import { HttpService } from '@/services';

import styles from './Store.module.scss';

interface IStoreInfo {
  orderCapacity: string;
  tags: string[];
  shortDesc: string;
  longDesc: string;
  radius: number;
}

export function Store() {
  const [storeInfo, setStoreInfo] = useState<IStoreInfo | null>(null);

  const onStoreChange = (e: any) => {
    setStoreInfo({
      ...(storeInfo ?? ({} as IStoreInfo)),
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    HttpService.get('/user/vendor/profile/store').then(response => {
      setStoreInfo(response ?? null);
    });
  }, []);

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
                  name="orderCapacity"
                  rounded="full"
                  border="none"
                  bgcolor="secondary"
                  placeholder="Maximum Order Fulfillment Capacity"
                  value={storeInfo && storeInfo.orderCapacity}
                  updateValue={onStoreChange}
                />
              </div>
              <div className={styles.control}>
                <p>Store Tags</p>
                <TagInput options={(storeInfo && storeInfo.tags) ?? []} />
              </div>
            </div>
            <div className={styles.control}>
              <p>
                Shop Short Description <span>48 Characters</span>
              </p>
              <TextField
                name="shortDesc"
                rows={2}
                rounded="full"
                border="none"
                bgcolor="secondary"
                className={styles.desc}
                placeholder="Shop Short Description"
                value={(storeInfo && storeInfo.shortDesc) ?? ''}
                updateValue={onStoreChange}
              />
            </div>
            <div className={styles.control}>
              <p>Shop Long Description</p>
              <TextField
                name="longDesc"
                rows={3}
                rounded="full"
                border="none"
                bgcolor="secondary"
                className={styles.desc}
                placeholder="Shop Long Description"
                
                updateValue={onStoreChange}
              />
            </div>
            <div className={styles.horizon}>
              <div className={styles.control}>
                <p className={styles.visible}>
                  Visible Radius In Miles <span>(for items sold near by)</span>
                </p>
                <Input
                  name="radius"
                  rounded="full"
                  border="none"
                  bgcolor="secondary"
                  placeholder="Miles"
                  updateValue={onStoreChange}
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
