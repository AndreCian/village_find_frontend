import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import clsx from 'clsx';

import { Card } from '@/components/common';
import {
  Radio,
  RadioGroup,
  Input,
  Select,
  TextField,
} from '@/components/forms';
import { ProductDialog } from '@/components/super-admin/common';

import { MagicIcon } from '@/components/icons';

import styles from './General.module.scss';

type PayType = 'Shipping' | 'Near By' | 'Local Subscriptions';

interface IProductGeneralInfo {
  name: string;
  payment: PayType;
  category: string;
  shortDesc: string;
  longDesc: string;
  disclaimer: string;
  unit: string;
  tax: number;
}

const initialInfo: IProductGeneralInfo = {
  name: '',
  payment: 'Shipping',
  category: '',
  shortDesc: '',
  longDesc: '',
  disclaimer: '',
  unit: '',
  tax: 0,
};

export function General() {
  const [generalInfo, setGeneralInfo] =
    useState<IProductGeneralInfo>(initialInfo);
  const [productDialogOpen, setProductDialogOpen] = useState(false);

  return (
    <div className={styles.root}>
      <Card className={styles.blog}>
        <div className={styles.container}>
          <span className={styles.magicPanel}>
            <MagicIcon className={styles.magicIcon} />
          </span>
          <div className={styles.desc}>
            <h2>Using AI</h2>
            <p>
              If get stuck trying to create a product name or description, let
              our AI do it for you!
            </p>
            <span>Learn More</span>
          </div>
        </div>
      </Card>
      <Card className={styles.information}>
        <div className={styles.container}>
          <div className={styles.thumbnail}>
            <p>My Products</p>
            <FaChevronRight className={styles.arrow} />
            <span>General Information</span>
          </div>
          <div className={styles.variant}>
            <p>
              <span>Products Name:</span> Black Polish Radish
            </p>
            <div className={styles.paytype}>
              <RadioGroup
                value={generalInfo.payment}
                updateValue={(value: string) =>
                  setGeneralInfo({ ...generalInfo, payment: value as PayType })
                }
              >
                {['Shipping', 'Near By', 'Local Subscriptions'].map(
                  (type: string, index: number) => (
                    <div
                      key={type}
                      className={clsx(
                        styles.radioPanel,
                        generalInfo.payment === type ? styles.active : '',
                      )}
                    >
                      <Radio
                        value={type}
                        label={type}
                        className={styles.radio}
                      />
                    </div>
                  ),
                )}
              </RadioGroup>
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.control}>
              <p>Product Category</p>
              {/* <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Product Category"
              /> */}
              <Select
                placeholder="Product category"
                options={[]}
                className={styles.categories}
              />
            </div>
            <div className={styles.control}>
              <p>Product name</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Product name"
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon onClick={() => setProductDialogOpen(true)} />
                  ),
                }}
              />
            </div>
            <div className={styles.control}>
              <p>Short Product Description</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Short Product Description"
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon onClick={() => setProductDialogOpen(true)} />
                  ),
                }}
              />
            </div>
            <div className={styles.control}>
              <p>Long Product Description</p>
              <TextField
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Long Product Description"
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon onClick={() => setProductDialogOpen(true)} />
                  ),
                }}
              />
            </div>
            <div className={styles.control}>
              <p>Discalimer</p>
              <TextField
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Discalimer"
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon onClick={() => setProductDialogOpen(true)} />
                  ),
                }}
              />
            </div>
            <div className={styles.control}>
              <p>Product Nutrition Facts</p>
              <Input
                type="file"
                rounded="full"
                border="none"
                bgcolor="secondary"
              />
            </div>
            <div className={styles.control}>
              <p>Sold By Units</p>
              <Select
                rounded="full"
                border="none"
                bgcolor="primary"
                placeholder="Sold By Units"
              />
            </div>
            <div className={styles.control}>
              <p>Tax</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Tax"
              />
            </div>
          </div>
          <div className={styles.buttonBar}>
            <button className={styles.button}>Cancel</button>
            <button className={clsx(styles.button, styles.updateButton)}>
              Update
            </button>
          </div>
        </div>
      </Card>
      <ProductDialog
        open={productDialogOpen}
        onClose={() => setProductDialogOpen(false)}
      />
    </div>
  );
}
