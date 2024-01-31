import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { enqueueSnackbar } from 'notistack';

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
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [nutrition, setNutrition] = useState<File | null>(null);
  const [generalInfo, setGeneralInfo] =
    useState<IProductGeneralInfo>(initialInfo);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [dialogTopic, setDialogTopic] = useState<TopicType>('product name');

  const onAnswerSelect = (answer: string) => {
    setGeneralInfo({
      ...generalInfo,
      [dialogTopic === 'product name'
        ? 'name'
        : dialogTopic === 'long product description'
        ? 'longDesc'
        : dialogTopic === 'short product description'
        ? 'shortDesc'
        : 'disclaimer']: answer,
    });
    setProductDialogOpen(false);
  };

  const onDialogOpenClick = (topic: TopicType) => () => {
    if (!generalInfo.category) {
      return enqueueSnackbar('Choose on the product categories.', {
        variant: 'warning',
      });
    }
    setDialogTopic(topic);
    setProductDialogOpen(true);
  };

  const onNutritionChange = (e: any) => {
    setNutrition(e.target.files[0]);
  };

  const onCancelClick = () => {
    navigate('/vendor/products');
  };

  const onSubmitClick = () => {
    const formData = new FormData();
    Object.keys(generalInfo).forEach((key: string) => {
      formData.append(key, (generalInfo as any)[key]);
    });
    if (nutrition) formData.append('nutrition', nutrition);
    console.log(formData);
    HttpService.post('/products', formData).then(response => {});
  };

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
                  (type: string) => (
                    <div
                      key={type}
                      className={clsx(
                        styles.radioPanel,
                        generalInfo.payment === type ? styles.active : '',
                      )}
                      onClick={() =>
                        setGeneralInfo({
                          ...generalInfo,
                          payment: type as PayType,
                        })
                      }
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
                value={generalInfo.name}
                className={styles.input}
                disabled={true}
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon onClick={onDialogOpenClick('product name')} />
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
                disabled={true}
                className={styles.input}
                value={generalInfo.shortDesc}
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon
                      onClick={onDialogOpenClick('short product description')}
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
                disabled={true}
                value={generalInfo.longDesc}
                className={styles.textInput}
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon
                      onClick={onDialogOpenClick('long product description')}
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
                disabled={true}
                className={styles.textInput}
                value={generalInfo.disclaimer}
                adornment={{
                  position: 'right',
                  content: (
                    <MagicIcon onClick={onDialogOpenClick('disclaimer')} />
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
                value={nutrition ?? ''}
                updateValue={onNutritionChange}
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
            <button className={styles.button} onClick={onCancelClick}>
              Cancel
            </button>
            <button
              className={clsx(styles.button, styles.updateButton)}
              onClick={onSubmitClick}
            >
              {productId === 'create' ? 'Add' : 'Update'}
            </button>
          </div>
        </div>
      </Card>
      <AIDialog
        open={productDialogOpen}
        topic={dialogTopic}
        category={generalInfo.category}
        onClose={() => setProductDialogOpen(false)}
        onSelect={onAnswerSelect}
      />
    </div>
  );
}
