import { useNavigate, useParams } from 'react-router-dom';

import { TableBody } from '@/components/common';
import { GridIcon, TrashIcon } from '@/components/icons';

import { ITableColumn } from '@/interfaces';

import styles from './Specifications.module.scss';
import { useEffect, useState } from 'react';
import { HttpService } from '@/services';
import { enqueueSnackbar } from 'notistack';

const subPath = '/vendor/products';

interface ISpec {
  _id: string;
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

  const onDeleteClick = (id: string) => () => {
    HttpService.put(
      `/products/${productId}/specification`,
      specifications.filter(item => item._id !== id),
    ).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('Specification deleted.', { variant: 'success' });
        setSpecifications(specifications.filter(item => item._id !== id));
      }
    });
  };

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
          <button className={styles.button} onClick={() => navigate(row._id)}>
            Edit
          </button>
          <span onClick={onDeleteClick(row._id)}>
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
