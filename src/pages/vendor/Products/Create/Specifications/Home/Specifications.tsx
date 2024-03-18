import { useNavigate, useParams } from 'react-router-dom';

import { TableBody } from '@/components/common';
import { GridIcon, TrashIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import styles from './Specifications.module.scss';
import { useEffect, useState } from 'react';
import { HttpService } from '@/services';

const subPath = '/vendor/products';

interface ISpec {
  name: string;
}

const specs = [
  'SKU',
  'UPC',
  'Weight',
  'Height',
  'Width',
  'Length',
  'Package Quantity',
].map((spec: string) => ({ name: spec, value: spec.toLowerCase() }));

export function Specifications() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [specifications, setSpecifications] = useState<ISpec[]>([]);

  const stylesTableColumns: ITableColumn[] = [
    {
      title: 'Specification Name',
      name: 'name',
      width: 400,
      cell: (row: any) => (
        <div className={styles.name}>
          <GridIcon />
          <span>{specs.find(spec => spec.value === row.name)?.name || ''}</span>
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

  useEffect(() => {
    HttpService.get(`/products/${productId}/specification`).then(response => {
      const { status, specifications } = response;
      if (status === 200) {
        setSpecifications(specifications);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttonBar}>
        <button
          className={styles.button}
          onClick={() =>
            navigate(`${subPath}/${productId}/specifications/create`)
          }
        >
          New
        </button>
      </div>
      <TableBody columns={stylesTableColumns} rows={specifications} />
    </div>
  );
}
