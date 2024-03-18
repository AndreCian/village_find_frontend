import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { Select, TextField } from '@/components';
import { ChangeInputEvent } from '@/interfaces';
import { HttpService } from '@/services';

import styles from './SpecCreate.module.scss';
import { enqueueSnackbar } from 'notistack';

const specs = [
  'SKU',
  'UPC',
  'Weight',
  'Height',
  'Width',
  'Length',
  'Package Quantity',
].map((spec: string) => ({ name: spec, value: spec.toLowerCase() }));
const subPath = '/vendor/products';

export function SpecCreate() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [specName, setSpecName] = useState('');
  const [specValue, setSpecValue] = useState('');

  const onSpecNameChange = (value: string) => {
    setSpecName(value);
  };

  const onSpecValueChange = (e: ChangeInputEvent) => {
    setSpecValue(e.target.value);
  };

  const onUpdateClick = () => {
    HttpService.post(`/products/${productId}/specification`, {
      name: specName,
      value: specValue,
    }).then(response => {
      const { status } = response;
      if (status === 200) {
        navigate(`${subPath}/${productId}/specifications`);
        enqueueSnackbar('Specification added successfully!', {
          variant: 'success',
        });
      } else if (status === 404) {
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.control}>
          <p>Add Specification</p>
          <Select
            rounded="full"
            border="none"
            bgcolor="primary"
            placeholder="SKU"
            options={specs}
            value={specName}
            updateValue={onSpecNameChange}
          />
        </div>
        <div className={styles.values}>
          <TextField
            rows={1}
            rounded="full"
            border="none"
            bgcolor="primary"
            placeholder="Enter Specification Values"
            value={specValue}
            updateValue={onSpecValueChange}
          />
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button
          className={styles.button}
          onClick={() => navigate(`${subPath}/${productId}/specifications`)}
        >
          Cancel
        </button>
        <button
          className={clsx(styles.button, styles.updateBtn)}
          onClick={onUpdateClick}
        >
          Add
        </button>
      </div>
    </div>
  );
}
