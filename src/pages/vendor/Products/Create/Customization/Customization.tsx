import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import clsx from 'clsx';

import { Input, Radio, TextField } from '@/components/forms';
import { ChangeInputEvent } from '@/interfaces';
import { HttpService } from '@/services';

import styles from './Customization.module.scss';

const subPath = '/vendor/products';

interface ICustomization {
  customText: string;
  fee: Number;
}

export function Customization() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [customization, setCustomization] = useState<ICustomization>({
    customText: '',
    fee: 0,
  });

  const onUpdateClick = () => {
    HttpService.post(
      `/products/${productId}/customization`,
      customization,
    ).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('Customization updated successfully!', {
          variant: 'success',
        });
      } else {
        enqueueSnackbar('Something went wrong.', { variant: 'error' });
      }
    });
  };

  const onCustomChange = (e: ChangeInputEvent) => {
    setCustomization({ ...customization, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    HttpService.get(`/products/${productId}/customization`).then(response => {
      const { status, customization } = response;
      if (status === 200) {
        setCustomization(customization);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.control}>
          <p>Add Product Customization</p>
          <button className={styles.button}>
            <Radio label="Activate" className={styles.btnRadio} />
          </button>
        </div>
        <div className={styles.control}>
          <p>Share how to customize</p>
          <TextField
            name="customText"
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Share how to customize"
            value={customization.customText}
            updateValue={onCustomChange}
          />
        </div>
        <div className={styles.control}>
          <p>Customization Fee</p>
          <Input
            name="fee"
            type="number"
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Size fee option"
            adornment={{
              position: 'left',
              content: '$',
            }}
            className={styles.feeInput}
            value={customization.fee}
            updateValue={onCustomChange}
          />
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button className={styles.button} onClick={() => navigate(subPath)}>
          Cancel
        </button>
        <button
          className={clsx(styles.button, styles.updateBtn)}
          onClick={onUpdateClick}
        >
          Update
        </button>
      </div>
    </div>
  );
}
