import { RefObject } from 'react';
import clsx from 'clsx';

import styles from './Card.module.scss';

export interface ICardProps {
  title?: React.ReactNode | string | null;
  className?: string;
  children: React.ReactNode;
  cardID?: string;
  ref?: RefObject<HTMLDivElement>;
}

export function Card({
  className = '',
  title = null,
  children,
  cardID = '',
  ref,
}: ICardProps) {
  return (
    <div id={cardID} className={clsx(styles.root, className)} ref={ref}>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}
