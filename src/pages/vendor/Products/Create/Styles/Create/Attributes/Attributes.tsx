import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { StyleCreateContext } from '../Layout';
import { IAttribute } from '../Home';

import { Button, Input, Select, TableBody } from '@/components';
import { ChangeInputEvent } from '@/interfaces';
import { HttpService } from '@/services';

import DimenImage from '/assets/vendor/backs/dimension.png';
import styles from './Attributes.module.scss';
import { SERVER_URL } from '@/config/global';

const statusOpts = ['Active', 'Inactive', 'Delete'];
const subPath = '/vendor/products';

export function Attributes() {
  const navigate = useNavigate();
  const { styleId, productId } = useParams();
  const { styleName, setStyleName, attributes, setAttributes } =
    useContext(StyleCreateContext);

  const [rows, setRows] = useState<any[]>([]);
  const [images, setImages] = useState<(File | null)[]>([]);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  const getSubRows = (
    attrs: IAttribute[],
    index: number,
    current: { attrs: object },
  ): any[] => {
    if (attrs.length === 0) return [current];
    return attrs[0].values
      .map((value: string) =>
        getSubRows(attrs.slice(1), index + 1, {
          attrs: {
            ...current.attrs,
            [attrs[0]._id || `attribute-${index}`]: value,
          },
        }),
      )
      .flat(1);
  };

  const onRowChange = (id: number) => (e: ChangeInputEvent) => {
    setRows(rows =>
      rows.map((row: any, rIndex: number) =>
        rIndex === id ? { ...row, [e.target.name]: e.target.value } : row,
      ),
    );
  };

  const onStatusChange = (id: number) => (value: string) => {
    setRows(rows =>
      rows.map((row: any, rIndex: number) =>
        rIndex === id ? { ...row, status: value } : row,
      ),
    );
  };

  const onImageChange = (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      const result = e.target?.result;
      if (result) {
        setImageSrcs(
          imageSrcs.map((item: string, index: number) =>
            index === id ? (result as string) : item,
          ),
        );
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setImages(
      images.map((image: File | null, index: number) =>
        index === id ? e.target.files && e.target.files[0] : image,
      ),
    );
  };

  const columns = useMemo(
    () => [
      ...attributes.map((attribute: IAttribute, index: number) => ({
        title: attribute.name,
        name: attribute._id || '',
        width: 100,
        cell: (row: any) => (
          <div className={styles.cell}>
            {row.attrs[attribute._id || `attribute-${index}`]}
          </div>
        ),
      })),
      {
        title: 'Price',
        name: 'price',
        width: 150,
        cell: (row: any) => (
          <Input
            name="price"
            rounded="full"
            adornment={{
              position: 'left',
              content: '$',
            }}
            className={styles.priceInput}
            value={row.price ?? 0}
            updateValue={onRowChange(row.id)}
          />
        ),
      },
      {
        title: 'Inventory',
        name: 'inventory',
        width: 150,
        cell: (row: any) => (
          <Input
            name="quantity"
            placeholder="Inventory"
            rounded="full"
            className={styles.inventoryInput}
            value={row.quantity || ''}
            updateValue={onRowChange(row.id)}
          />
        ),
      },
      {
        title: 'Status',
        name: 'status',
        width: 150,
        cell: (row: any) => (
          <Select
            rounded="full"
            options={statusOpts.map(status => ({
              name: status,
              value: status.toLowerCase(),
            }))}
            className={styles.statusSelect}
            value={row.status}
            updateValue={onStatusChange(row.id)}
          />
        ),
      },
      {
        title: 'Image',
        name: 'image',
        width: 300,
        cell: (row: any) => (
          <Input
            type="file"
            rounded="full"
            border="none"
            bgcolor="secondary"
            className={styles.imageInput}
            // value={images[row.id]}
            updateValue={onImageChange(row.id)}
          />
        ),
      },
      {
        title: 'Dimensions',
        name: 'dimensions',
        width: 200,
        cell: (row: any) => (
          <div className={styles.dimensions}>
            <img
              src={imageSrcs[row.id] || `${SERVER_URL}/${row.image}`}
              alt="inventory"
            />
            <span>+</span>
          </div>
        ),
      },
    ],
    [attributes, images, imageSrcs],
  );

  const onUpdateClick = () => {
    HttpService.put(`/styles/${styleId}/inventory`, rows).then(response => {
      const { status, ids } = response;
      if (status === 200) {
        const imageWithIDs = new FormData();
        const liveIDs: string[] = [];
        images.forEach((image: File | null, index: number) => {
          if (image) {
            liveIDs.push(ids[index]);
            imageWithIDs.append('images', image);
          }
        });
        imageWithIDs.append('inventIDs', JSON.stringify(liveIDs));

        HttpService.put(`/inventories/image`, imageWithIDs, {
          styleId,
        }).then(response => {
          const { status } = response;
          if (status === 200) {
            enqueueSnackbar('Inventories saved.', {
              variant: 'success',
            });
            navigate(`${subPath}/${productId}/style`);
          } else if (status === 404) {
            navigate(`${subPath}`);
            enqueueSnackbar('Product is not valid!', { variant: 'warning' });
          }
        });
      }
    });
  };

  useEffect(() => {
    HttpService.get(`/styles/${styleId}`).then(response => {
      const { status, style } = response;
      if (status === 200) {
        const { name, attributes, inventories } = style;
        setStyleName(name);
        setAttributes(attributes);
        if (inventories.length === 0) {
          const subRows = getSubRows(attributes, 0, { attrs: {} }).map(
            (row: any, index: number) => ({
              ...row,
              id: index,
              inventory: 0,
              price: 0,
              status: 'active',
            }),
          );
          setRows(subRows);
          setImages(Array(subRows.length).fill(null));
          setImageSrcs(Array(subRows.length).fill(''));
        } else {
          setRows(
            inventories.map((inventory: any, index: number) => ({
              ...inventory,
              id: index,
              status: inventory.status || 'active',
            })),
          );
          setImages(Array(inventories.length).fill(null));
          setImageSrcs(Array(inventories.length).fill(''));
        }
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.heading}>
        <span>Style Name: </span>
        {styleName}
      </p>
      <TableBody columns={columns} rows={rows} />
      <div className={styles.buttons}>
        <Button className={styles.updateBtn} onClick={onUpdateClick}>
          Update
        </Button>
      </div>
    </div>
  );
}
