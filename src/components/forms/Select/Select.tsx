import React, { ChangeEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import { useOnClickOutside } from '@/utils';

import styles from './Select.module.scss';

type RoundedType = 'full' | 'small';
type BorderType = 'solid' | 'none';
type BgColorType = 'primary' | 'secondary' | 'blue' | 'red' | 'white' | 'dark';

export interface ISelectProps {
  value?: string;
  updateValue?: (e: string) => void;
  placeholder?: string;
  options?: string[];
  rounded?: RoundedType;
  border?: BorderType;
  bgcolor?: BgColorType;
  className?: string;
}

export function Select({
  value = '',
  updateValue = () => {},
  placeholder = 'Select',
  options = [],
  rounded = 'small',
  border = 'solid',
  bgcolor = 'white',
  className = '',
}: ISelectProps) {
  const selectRef = useRef<HTMLDivElement>(null);
  const [anchor, setAnchor] = useState<boolean>(false);

  const classes = clsx(
    styles.root,
    rounded === 'full' ? styles.roundedFull : '',
    border === 'none' ? styles.borderNone : '',
    bgcolor === 'primary'
      ? styles.bgColorPrimary
      : bgcolor === 'secondary'
      ? styles.bgColorSecondary
      : bgcolor === 'blue'
      ? styles.bgColorBlue
      : bgcolor === 'red'
      ? styles.bgColorRed
      : bgcolor === 'dark'
      ? styles.bgColorDark
      : '',
    className,
  );

  const onSelectOption = (option: string) => {
    updateValue(option);
    setAnchor(false);
  };

  useOnClickOutside(selectRef, () => setAnchor(false), 'mousedown');

  return (
    <div className={classes} ref={selectRef}>
      <div className={styles.selectBox} onClick={() => setAnchor(!anchor)}>
        <span>{value === '' ? placeholder : value}</span>
        {anchor ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {anchor && options.length !== 0 && (
        <div className={styles.viewBox}>
          {options.map((option: string) => (
            <span
              key={option}
              onClick={() => onSelectOption(option)}
              className={option === value ? styles.activeItem : ''}
            >
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
