import React from 'react';
import clsx from 'clsx';

import { FaChevronDown } from 'react-icons/fa6';

import { ITableColumn } from '@/interfaces';

import styles from './TableBody.module.scss';

export interface ITableBodyProps {
  columns: ITableColumn[];
  rows: any[];
  expandable?: boolean;
  className?: string;
  expandPanel?: React.ReactNode;
}

export function TableBody({
  columns,
  rows,
  expandable = false,
  className = '',
  expandPanel,
}: ITableBodyProps) {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.header}>
        {columns.map((column: ITableColumn) => (
          <span
            key={`header-${column.name}`}
            style={{ width: `${column.width || 150}px` }}
          >
            {column.title}
          </span>
        ))}
        {expandable && <span className={styles.exSpan}></span>}
      </div>
      <div className={styles.body}>
        {rows.map((row: any, rowIndex: number) => (
          <div key={rowIndex}>
            <div key={`row-${rowIndex}`} className={styles.row}>
              {columns.map((column: ITableColumn, colIndex: number) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={{ width: `${column.width || 150}px` }}
                >
                  {column.cell ? (
                    <>{column.cell(row)}</>
                  ) : (
                    <span>{row[column.name]}</span>
                  )}
                </div>
              ))}
              {expandable && (
                <div className={styles.expandIcon}>
                  <span>
                    <FaChevronDown />
                  </span>
                </div>
              )}
            </div>
            {expandable && expandPanel && (
              <div className={styles.exSection}>{expandPanel}</div>
            )}
            {rowIndex !== rows.length - 1 && (
              <div key={`divider-${rowIndex}`} className={styles.divider} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
