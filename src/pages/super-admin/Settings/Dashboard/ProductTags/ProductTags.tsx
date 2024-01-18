import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { Card, TableToolbar, TableBody } from '@/components/common';
import { Select } from '@/components/forms';

import { TrashIcon } from '@/components/icons';

import { TagService } from '@/services';

import { useTagsStore } from '@/stores';

import { ITableColumn } from '@/interfaces';

import styles from './ProductTags.module.scss';

const tagPathPrefix = '/admin/settings/dashboard/tags';

export function ProductTags() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const {
    tags: storeTags,
    setTags: setStoreTags,
    deleteTag: deleteStoreTag,
  } = useTagsStore();

  const onEditClick = (id: string) => {
    navigate(`${tagPathPrefix}/${id}`);
  };

  const statuses: string[] = ['Active', 'Inactive'];
  const columns: ITableColumn[] = [
    {
      title: 'Tag Name',
      name: 'name',
      width: 250,
    },
    {
      title: 'Status',
      name: 'status',
      width: 250,
      cell: (row: any) => (
        <Select
          rounded="full"
          placeholder={row.status}
          // options={statuses}
          className={styles.statusSelector}
        />
      ),
    },
    {
      title: 'Action',
      name: 'action',
      width: 250,
      cell: (row: any) => (
        <div className={styles.actionCell}>
          <button
            className={styles.actionButton}
            onClick={() => onEditClick(row._id)}
          >
            Edit
          </button>
          <span onClick={() => onDeleteClick(row._id)}>
            <TrashIcon />
          </span>
        </div>
      ),
    },
  ];

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const updateStatus = (_category: string) => {
    setCategory(_category);
  };

  const onDeleteClick = (id: string) => {
    TagService.deleteOne(id)
      .then(() => {
        enqueueSnackbar('Tag deleted successfully!', { variant: 'success' });
        deleteStoreTag(id);
      })
      .catch(err => {
        enqueueSnackbar('Error occured!', { variant: 'error' });
      });
  };

  useEffect(() => {
    TagService.findAll(filter, category).then(tags => {
      setStoreTags(tags);
    });
  }, [filter, category]);

  return (
    <Card title="Product Tags" className={styles.root}>
      <TableToolbar
        search={filter}
        updateSearch={updateFilter}
        searchTitle="Tag Name"
        category={category}
        updateCategory={updateStatus}
        selectTitle="Status"
        selectOpts={statuses}
        className={styles.tableToolbar}
        actions={
          <div>
            <p className={styles.buttonLabel}>New</p>
            <button
              className={styles.actionButton}
              onClick={() => navigate(`${tagPathPrefix}/create`)}
            >
              New
            </button>
          </div>
        }
      />
      <TableBody
        columns={columns}
        rows={storeTags}
        className={styles.tableBody}
      />
    </Card>
  );
}
