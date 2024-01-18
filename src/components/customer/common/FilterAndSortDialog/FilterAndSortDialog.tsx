import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import clsx from 'clsx';

import { Button, Input, Select } from '@/components/forms';

import { useOnClickOutside } from '@/utils';

import styles from './FilterAndSortDialog.module.scss';

interface IFilterAndSortDialogProps {
  open: boolean;
  onApply?: () => void;
  onClose?: () => void;
}

const initialSortOptions = ['Sort Alphabetically, A-Z'];

export function FilterAndSortDialog({
  open,
  onApply = () => {},
  onClose = () => {},
}: IFilterAndSortDialogProps) {
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });
  const [orderBy, setOrderBy] = useState('Sort Alphabetically, A-Z');
  const dialogRef = useRef<HTMLDivElement>(null);

  const onPriceChange = (which: string) => (e: any) => {
    setPrice({ ...price, [which]: e.target.value });
  };

  const onSortChange = (sort: string) => {
    setOrderBy(sort);
  };

  const onApplyClick = () => {
    onApply();
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  useEffect(() => {
    if (dialogRef.current === null) return;
    useOnClickOutside(dialogRef, onClose, 'mousedown');
  }, []);

  return (
    <div className={clsx(styles.root, !open ? styles.hide : '')}>
      <div className={styles.container} ref={dialogRef}>
        <div className={styles.content}>
          <div className={styles.filter}>
            <label>Price</label>
            <div className={styles.filterInput}>
              <Input placeholder="Min Price" className={styles.input} />
              <Input placeholder="Max Price" className={styles.input} />
            </div>
          </div>
          <div className={styles.sort}>
            <label>Sort</label>
            <Select
              value={orderBy}
              className={styles.sortSelect}
              options={initialSortOptions}
              updateValue={onSortChange}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            className={clsx(styles.button, styles.applyBtn)}
            onClick={onApplyClick}
          >
            Apply
          </Button>
          <Button
            className={clsx(styles.button, styles.cancelBtn)}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
        <span className={styles.closeBtn} onClick={onClose}>
          <FaTimes size={24} />
        </span>
      </div>
    </div>
  );
}
