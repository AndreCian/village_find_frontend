import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

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

import styles from './General.module.scss';

type PayType = 'Shipping' | 'Near By' | 'Local Subscriptions';
type TopicType =
  | 'product name'
  | 'short product description'
  | 'long product description'
  | 'disclaimer';

interface IProductGeneralInfo {
  name: string;
  deliveryTypes: PayType[];
  category: string;
  shortDesc: string;
  longDesc: string;
  disclaimer: string;
  soldByUnit: string;
  tax: number;
}

const initialInfo: IProductGeneralInfo = {
  name: '',
  deliveryTypes: [],
  category: '',
  shortDesc: '',
  longDesc: '',
  disclaimer: '',
  soldByUnit: '',
  tax: 0,
};

export function General() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [nutrition, setNutrition] = useState<File | null>(null);
  const [generalInfo, setGeneralInfo] =
    useState<IProductGeneralInfo>(initialInfo);
  const [categories, setCategories] = useState<any[]>([]);
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

  const onDeliveryTypeChange = (value: string) => {
    const deliveryTypes = generalInfo.deliveryTypes;
    const isExist = deliveryTypes.includes(value as PayType);
    if (isExist) {
      setGeneralInfo({
        ...generalInfo,
        deliveryTypes: deliveryTypes.filter(item => (item as string) !== value),
      });
      return;
    }
    if (
      (value === 'Shipping' && deliveryTypes.includes('Local Subscriptions')) ||
      (value === 'Local Subscriptions' && deliveryTypes.includes('Shipping'))
    )
      return;
    setGeneralInfo({
      ...generalInfo,
      deliveryTypes: [...deliveryTypes, value as PayType],
    });
  };

  const onCancelClick = () => {
    navigate('/vendor/products');
  };

  const onSubmitClick = () => {
    const formData = new FormData();
    formData.append('name', generalInfo.name);
    formData.append('category', generalInfo.category);
    formData.append('deliveryTypes', JSON.stringify(generalInfo.deliveryTypes));
    formData.append('shortDesc', generalInfo.shortDesc);
    formData.append('longDesc', generalInfo.longDesc);
    formData.append('disclaimer', generalInfo.disclaimer);
    formData.append('soldByUnit', generalInfo.soldByUnit);
    formData.append('tax', `${generalInfo.tax}`);
    if (nutrition) formData.append('nutrition', nutrition);

    if (productId === 'create') {
      HttpService.post('/products', formData).then(response => {
        const { status } = response;
        if (status === 200) {
          enqueueSnackbar('One product added.', { variant: 'success' });
        } else {
          enqueueSnackbar('Something went wrong!', { variant: 'error' });
        }
      });
      return;
    }
    HttpService.put(`/products/${productId}`, formData).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('Product updated!', { variant: 'success' });
      } else {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      }
    });
  };

  useEffect(() => {
    HttpService.get('/settings/general/category').then(response => {
      setCategories(
        response.map((item: any) => ({
          ...item,
          value: item.name.toLowerCase(),
        })),
      );
    });
  }, []);

  useEffect(() => {
    if (productId === 'create') return;
    HttpService.get(`/products/vendor/${productId}`).then(response => {
      const { status, product } = response;
      if (status === 200) {
        setGeneralInfo(product);
      }
    });
  }, [productId]);

  return (
    <div className={styles.root}>
      <div className={styles.information}>
        <div className={styles.container}>
          <div className={styles.variant}>
            <div className={styles.paytype}>
              <RadioGroup
                multiple={true}
                value={generalInfo.deliveryTypes}
                updateValue={onDeliveryTypeChange}
              >
                {['Shipping', 'Near By', 'Local Subscriptions'].map(
                  (type: string) => (
                    <div
                      key={type}
                      className={clsx(
                        styles.radioPanel,
                        generalInfo.deliveryTypes.includes(type as PayType)
                          ? styles.active
                          : '',
                      )}
                      onClick={() => onDeliveryTypeChange(type)}
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
                options={categories}
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
                placeholder="unit"
                value={generalInfo.soldByUnit}
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
      </div>
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
