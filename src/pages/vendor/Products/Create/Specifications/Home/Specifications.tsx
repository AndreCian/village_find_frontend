import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';

import { Card, TableBody } from '@/components/common';
import { GridIcon, TrashIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import styles from './Specifications.module.scss';

const specCreatePath = '/vendor/products/create/specifications/create';

interface ISpec {
  name: string;
}

const specs: ISpec[] = [
  { name: 'Weight' },
  { name: 'Height' },
  { name: 'Ingredients' },
  { name: 'Alergies' },
];

export function Specifications() {
  const navigate = useNavigate();

  const stylesTableColumns: ITableColumn[] = [
    {
      title: 'Specification Name',
      name: 'name',
      width: 400,
      cell: (row: any) => (
        <div className={styles.name}>
          <GridIcon />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      title: 'Action',
      name: 'action',
      width: 250,
      cell: (row: any) => (
        <div className={styles.action}>
          <button className={styles.button}>Edit</button>
          <span>
            <TrashIcon />
          </span>
        </div>
      ),
    },
  ];

  return (
    <Card className={styles.root}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <p>My Products</p>
          <FaChevronRight className={styles.arrow} />
          <span>Product Styles</span>
        </div>
        <div className={styles.variant}>
          <p>
            <span>Products Name:</span> Black Polish Radish
          </p>
        </div>
        <div className={styles.buttonBar}>
          <button
            className={styles.button}
            onClick={() => navigate(specCreatePath)}
          >
            New
          </button>
        </div>
        <TableBody columns={stylesTableColumns} rows={specs} />
      </div>
    </Card>
  );
}
