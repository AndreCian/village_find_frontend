import clsx from 'clsx';

import styles from './Container.module.scss';

export interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ className = '', children }: IContainerProps) {
  return <div className={clsx(styles.root, className)}>{children}</div>;
}
