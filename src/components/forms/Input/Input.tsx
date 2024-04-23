import React, { ChangeEvent, forwardRef } from 'react';
import clsx from 'clsx';

import styles from './Input.module.scss';

export type RoundedType = 'full' | 'small';
export type BorderType = 'solid' | 'none';
export type BorderColorType = 'primary' | 'success';
export type SizeType = 'large' | 'medium';
export type BgColorType = 'primary' | 'secondary';
export type AdornmentType = 'left' | 'right';
export type SelectType = 'text' | 'none';

export interface IAdornment {
  position: AdornmentType;
  content: React.ReactNode | string;
  isText?: boolean;
  onClick?: () => void;
}

export interface IInputProps {
  name?: string;
  type?: string;
  value?: any;
  defaultValue?: string;
  updateValue?: (e: any) => void;
  placeholder?: string;
  rounded?: RoundedType;
  border?: BorderType;
  borderColor?: BorderColorType;
  size?: SizeType;
  select?: SelectType;
  bgcolor?: BgColorType;
  adornment?: IAdornment;
  className?: string;
  disabled?: boolean;
  valueVisible?: boolean;

  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: any) => void;
}

export const Input = forwardRef((props: IInputProps, ref: any) => {
  const {
    name = '',
    type = 'text',
    placeholder = '',
    rounded = 'small',
    border = 'solid',
    borderColor = 'primary',
    size = 'medium',
    bgcolor = 'primary',
    select = 'text',
    className = '',
    value = '',
    disabled = false,
    adornment = null,
    defaultValue = '',
    updateValue = () => {},
    onClick = () => {},
    onBlur = () => {},
    onFocus = () => {},
    onKeyDown = () => {},
    valueVisible = true,
    ...nativeAttrs
  } = props;
  const classes = clsx(
    styles.root,
    rounded === 'full' ? styles.roundedFull : '',
    border === 'none' ? styles.borderNone : '',
    size === 'large' ? styles.sizeLarge : '',
    select === 'none' ? styles.selectNone : '',
    bgcolor === 'secondary' ? styles.bgColorSecondary : '',
    borderColor === 'success'
      ? styles.borderColorSuccess
      : borderColor === 'primary'
      ? styles.borderColorPrimary
      : '',
    adornment && adornment.position === 'right'
      ? styles.adornmentRight
      : adornment && adornment.position === 'left'
      ? styles.adornmentLeft
      : '',
    {
      [styles.isText]:
        adornment && adornment.isText && adornment.isText === true,
    },
    className,
  );

  return (
    <div className={classes}>
      <input
        name={name}
        type={type}
        value={valueVisible || !disabled ? value : ''}
        disabled={disabled}
        placeholder={placeholder}
        className={styles.input}
        onChange={updateValue}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        ref={ref}
        {...nativeAttrs}
      />
      {adornment ? (
        <span
          className={clsx(
            adornment.position === 'left'
              ? styles.leftAdorn
              : styles.rightAdorn,
            adornment.isText === true || typeof adornment.content === 'string'
              ? styles.textBar
              : styles.circleBar,
          )}
          onClick={adornment.onClick || (() => {})}
        >
          {adornment.content}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
});
