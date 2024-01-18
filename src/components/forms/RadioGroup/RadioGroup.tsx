import React, { useState } from 'react';
import clsx from 'clsx';

import { RadioContext } from './RadioContext';

import styles from './RadioGroup.module.scss';

export interface IRadioGroupProps {
  value?: string;
  color?: string;
  className?: string;
  updateValue?: (_value: string) => void;
  children: React.ReactNode;
}

export function RadioGroup({
  value = '',
  color = 'primary',
  className = '',
  updateValue = () => {},
  children,
}: IRadioGroupProps) {
  return (
    <RadioContext.Provider
      value={{
        value,
        color,
        updateValue,
      }}
    >
      <div className={clsx(styles.root, className)}>{children}</div>
    </RadioContext.Provider>
  );
}
