import React, { useContext } from 'react';
import clsx from 'clsx';

import { RadioContext } from './RadioContext';

import styles from './Radio.module.scss';

export interface IRadio {
  label?: string | React.ReactNode;
  value?: string;
  size?: string;
  className?: string;
}

export function Radio({
  label = '',
  value = '',
  size = 'medium',
  className = '',
}: IRadio) {
  const context = useContext(RadioContext);

  return (
    <div
      className={clsx(styles.root, className)}
      onClick={() => context.updateValue(value)}
    >
      <span
        className={
          context.value === value
            ? clsx(
                styles.radio,
                styles.active,
                size === 'small' ? styles.small : '',
                context.color === 'secondary' ? styles.secondary : ''
              )
            : styles.radio
        }
      />
      <p>{label}</p>
    </div>
  );
}
