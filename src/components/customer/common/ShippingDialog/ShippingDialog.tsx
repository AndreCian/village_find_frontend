import { useState, useEffect, useRef, useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import clsx from 'clsx';

import { Button, Radio, RadioGroup } from '@/components/forms';
import { AddressPanel } from '@/components/customer/Checkout';
import { CartContext } from '@/providers';
import { formatUsDate, useOnClickOutside } from '@/utils';
import { IRecipient, IDelivery } from '@/components/customer/Checkout';

import styles from './ShippingDialog.module.scss';

interface ShippingDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: ({ recipient, delivery }: {
    recipient: IRecipient, delivery: IDelivery
  }) => void;
  recipient: IRecipient;
  delivery: IDelivery;
}

export function ShippingDialog({
  open, onClose, onApply, recipient, delivery }: ShippingDialogProps) {
  const { addressList } = useContext(CartContext);

  const [_recipient, _setRecipient] = useState<IRecipient>(recipient);
  const [_delivery, _setDelivery] = useState<IDelivery>(delivery);

  const dialogRef = useRef<HTMLDivElement>(null);

  const onUpdateClick = () => {
    onApply({ recipient: _recipient, delivery: _delivery });
    onClose();
  }

  useEffect(() => {
    if (dialogRef.current) {
      useOnClickOutside(dialogRef, onClose, 'mousedown');
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  return open ? <div className={styles.root}>
    <div className={styles.container} ref={dialogRef}>
      <AddressPanel
        addressList={addressList}
        recipient={_recipient}
        setRecipient={_setRecipient}
        delivery={_delivery}
        setDelivery={_setDelivery}
      />
      <div className={styles.buttons}>
        <Button className={clsx(styles.updateBtn, styles.button)} onClick={onUpdateClick}>Yes</Button>
        <Button className={clsx(styles.cancelBtn, styles.button)} onClick={onClose}>Cancel</Button>
      </div>
    </div>
  </div> : null;
}
