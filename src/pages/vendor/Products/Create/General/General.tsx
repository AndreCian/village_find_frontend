import { useEffect, useState } from 'react';
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
import { AIDialog } from '@/components/super-admin/common';

import { MagicIcon } from '@/components/icons';

import { HttpService } from '@/services';

import { ICategory } from '@/interfaces';

import styles from './General.module.scss';

type PayType = 'Shipping' | 'Near By' | 'Local Subscriptions';
type TopicType =
  | 'product name'
  | 'short product description'
  | 'long product description'
  | 'disclaimer';

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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [dialogTopic, setDialogTopic] = useState<TopicType>('product name');

  useEffect(() => {
    HttpService.get('/settings/general/category').then(response => {
      setCategories(response);
    });
  }, []);

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
              <Select
                placeholder="Product category"
                options={categories.map((item: ICategory) => item.name)}
                className={styles.categories}
                value={generalInfo.category}
                updateValue={(category: string) =>
                  setGeneralInfo({ ...generalInfo, category })
                }
              />
            </div>
            <div className={styles.control}>
              <p>Product name</p>
              <Input
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Product name"
                className={styles.input}
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon
                      onClick={() => {
                        setDialogTopic('product name');
                        setProductDialogOpen(true);
                      }}
                    />
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
                className={styles.input}
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon
                      onClick={() => {
                        setDialogTopic('short product description');
                        setProductDialogOpen(true);
                      }}
                    />
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
                className={styles.textInput}
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon
                      onClick={() => {
                        setDialogTopic('long product description');
                        setProductDialogOpen(true);
                      }}
                    />
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
                placeholder="Disclaimer"
                className={styles.textInput}
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon
                      onClick={() => {
                        setDialogTopic('disclaimer');
                        setProductDialogOpen(true);
                      }}
                    />
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
      <AIDialog
        open={productDialogOpen}
        onClose={() => setProductDialogOpen(false)}
        topic={dialogTopic}
        category={generalInfo.category}
      />
    </div>
  );
}
