import clsx from 'clsx';

import styles from './Card.module.scss';

export interface ICardProps {
  title?: React.ReactNode | string | null;
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = '', title = null, children }: ICardProps) {
  return (
    <div className={clsx(styles.root, className)}>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}
