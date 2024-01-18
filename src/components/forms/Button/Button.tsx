import clsx from 'clsx';

import styles from './Button.module.scss';

type VariantType = 'filled' | 'outlined' | 'none';
type ColorType = 'success' | 'light';
type TextColorType = 'white' | 'black';

export interface IButtonProps {
  color?: ColorType;
  textColor?: TextColorType;
  variant?: VariantType;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({
  variant = 'filled',
  color = 'success',
  textColor = 'white',
  className = '',
  onClick = () => {},
  children,
}: IButtonProps) {
  const classes = clsx(
    styles.root,
    variant === 'outlined'
      ? styles.variantOutlined
      : variant === 'none'
      ? styles.variantNone
      : '',
    color === 'light' ? styles.colorLight : '',
    className,
  );
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
