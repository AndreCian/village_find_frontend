import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { FaTimes } from 'react-icons/fa';
import clsx from 'clsx';

import { Button, Input, Select, TextField } from '@/components/forms';
import { useOnClickOutside } from '@/utils';

import styles from './ParcelDialog.module.scss';

export interface IParcel {
  width: number;
  height: number;
  length: number;
  distanceUnit: string;
  weight: number;
  massUnit: string;
}

interface IParcelDialogProps {
  open: boolean;
  parcel: IParcel | null;
  onClose?: () => void;
  onApply?: (parcel: IParcel) => void;
}

const emptyParcel: IParcel = {
  width: 0,
  height: 0,
  length: 0,
  distanceUnit: '',
  weight: 0,
  massUnit: ''
};

const SIZE_UNITS = ['cm', 'in', 'ft', 'm', 'mm', 'yd'];
const MASS_UNITS = ['g', 'kg', 'lb', 'oz'];

export function ParcelDialog({
  open,
  parcel: initialParcel,
  onClose = () => { },
  onApply = () => { },
}: IParcelDialogProps) {
  const [parcel, setParcel] = useState<IParcel>(initialParcel || emptyParcel);

  const dialogRef = useRef<HTMLDivElement>(null);

  const onParcelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParcel({ ...parcel, [e.target.name]: e.target.value });
  }

  const onCancelClick = () => {
    onClose();
  }

  const onUpdateClick = () => {
    onApply(parcel);
    onClose();
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
      if (dialogRef.current) {
        useOnClickOutside(dialogRef, onClose, 'mousedown');
      }
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  useEffect(() => {
    setParcel(initialParcel || emptyParcel);
  }, [initialParcel]);

  return (
    open ? (
      <div className={styles.root}>
        <div className={styles.container} ref={dialogRef}>
          <p className={styles.title}>Add Parcel Size</p>
          <p className={styles.description}>Product dimensions padded not packed</p>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Width</p>
              <Input
                type="number"
                name="width"
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Width"
                value={parcel.width}
                updateValue={onParcelChange}
              />
            </div>
            <div className={styles.control}>
              <p>Height</p>
              <Input
                type="number"
                name="height"
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Height"
                value={parcel.height}
                updateValue={onParcelChange}
              />
            </div>
            <div className={styles.control}>
              <p>Length</p>
              <Input
                type="number"
                name="length"
                rounded="full"
                border="none"
                bgcolor="secondary"
                placeholder="Length"
                value={parcel.length}
                updateValue={onParcelChange}
              />
            </div>
          </div>
          <p className={styles.description}>
            Weight of product for calculating shipping costs
          </p>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Variant Weight</p>
              <Input
                name='weight'
                rounded='full'
                border='none'
                bgcolor='secondary'
                placeholder='Variant Weight'
                value={parcel.weight}
                updateValue={onParcelChange}
              />
            </div>
          </div>
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Size Unit</p>
              <Select
                border='none'
                bgcolor='primary'
                rounded='full'
                options={SIZE_UNITS.map(item => ({ name: item, value: item.toLowerCase() }))}
                value={parcel.distanceUnit}
                updateValue={(value: string) => setParcel({ ...parcel, distanceUnit: value })}
              />
            </div>
            <div className={styles.control}>
              <p>Mass Unit</p>
              <Select
                border='none'
                bgcolor='primary'
                rounded='full'
                options={MASS_UNITS.map(item => ({ name: item, value: item.toLowerCase() }))}
                value={parcel.massUnit}
                updateValue={(value: string) => setParcel({ ...parcel, massUnit: value })}
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              className={clsx(styles.button, styles.cancel)}
              onClick={onCancelClick}
            >
              Cancel
            </button>
            <button className={clsx(styles.button, styles.update)} onClick={onUpdateClick}>
              Update
            </button>
          </div>
          <span className={styles.closeBtn} onClick={onClose}>
            <FaTimes size={24} />
          </span>
        </div>
      </div >
    ) : null
  );
}
