import { useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import { useOnClickOutside } from '@/utils';

import styles from './Select.module.scss';

type RoundedType = 'full' | 'small';
type BorderType = 'solid' | 'none';
type BgColorType = 'primary' | 'secondary' | 'blue' | 'red' | 'white' | 'dark';

export interface ISelectProps {
  value?: string | null;
  updateValue?: (e: string) => void;
  placeholder?: string;
  options?: (string | { _id?: string; name: string; value: string })[];
  rounded?: RoundedType;
  border?: BorderType;
  bgcolor?: BgColorType;
  className?: string;
  disabled?: boolean;
  colorable?: boolean;
  colors?: { status: string; color: string }[];
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
  disabled = false,
  colorable = false,
  colors = [],
}: ISelectProps) {
  const [anchor, setAnchor] = useState<boolean>(false);
  const currentName = useMemo(() => {
    const currentOption = options.find(item =>
      typeof item === 'object'
        ? item.value.toLowerCase() === value?.toLowerCase()
        : item.toLowerCase() === value?.toLowerCase(),
    );
    return !currentOption
      ? placeholder
      : typeof currentOption === 'object'
      ? currentOption.name
      : currentOption;
  }, [value]);

  const selectRef = useRef<HTMLDivElement>(null);

  const colorClasses = () => {
    const currentColor = colors.find(
      (color: { status: string; color: string }) => color.status === value,
    );
    if (!currentColor) return {};
    return clsx([styles.colorable], {
      [styles.successSelectBox]: currentColor.color === 'success',
      [styles.warningSelectBox]: currentColor.color === 'warning',
      [styles.lightSelectBox]: currentColor.color === 'light',
      [styles.graySelectBox]: currentColor.color === 'gray',
    });
  };

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
      : colorable === true
      ? colorClasses()
      : '',
    className,
  );

  const onSelectOption = (option: string) => {
    if (disabled) return;
    updateValue(option);
    setAnchor(false);
  };

  useOnClickOutside(selectRef, () => setAnchor(false), 'mousedown');

  return (
    <div className={classes} ref={selectRef}>
      <div className={styles.selectBox} onClick={() => setAnchor(!anchor)}>
        <span className={clsx({ [styles.placeholder]: !value })}>
          {currentName}
        </span>
        {anchor ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {anchor && options.length !== 0 && (
        <div className={styles.viewBox}>
          {options.map(
            (
              option: string | { _id?: string; name: string; value: string },
              index: number,
            ) => (
              <span
                key={index}
                onClick={() =>
                  onSelectOption(
                    typeof option === 'object' ? option.value : option,
                  )
                }
                className={option === value ? styles.activeItem : ''}
              >
                {typeof option === 'object' ? option.name : option}
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
}
