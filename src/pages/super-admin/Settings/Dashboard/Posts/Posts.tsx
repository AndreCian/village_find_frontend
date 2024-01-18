import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, TableToolbar, TableBody } from '@/components/common';
import { Select } from '@/components/forms';
import { TrashIcon } from '@/components/icons';

import { PostService } from '@/services';

import { usePostStore } from '@/stores';

import { ITableColumn } from '@/interfaces';

import styles from './Posts.module.scss';

const initialStatus = ['Active', 'Inactive'];

const postPathPrefix = '/admin/settings/dashboard/posts';

export function Posts() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const {
    posts: storePosts,
    setPosts: setStorePosts,
    deletePost: deleteStorePost,
  } = usePostStore();

  const columns: ITableColumn[] = [
    {
      title: 'Post Name',
      name: 'name',
      width: 250,
    },
    {
      title: 'Topic',
      name: 'topic',
      width: 250,
    },
    {
      title: 'Status',
      name: 'status',
      width: 250,
      cell: (row: any) => (
        <Select
          rounded="full"
          value={row.status}
          options={[]}
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
            onClick={() => navigate(`${postPathPrefix}/${row._id}`)}
          >
            Edit
          </button>
          <span onClick={onDeleteClick(row._id)}>
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

  const onDeleteClick = (id: string) => () => {
    PostService.deleteOne(id).then(() => {
      deleteStorePost(id);
    });
  };

  useEffect(() => {
    PostService.findAll(filter, category).then(posts => {
      setStorePosts(posts);
    });
  }, [filter, category]);

  return (
    <Card title="Support Center" className={styles.root}>
      <TableToolbar
        search={filter}
        updateSearch={updateFilter}
        searchTitle="Metric Name"
        category={category}
        updateCategory={updateStatus}
        selectTitle="Status"
        selectOpts={initialStatus}
        className={styles.tableToolbar}
        actions={
          <div>
            <p className={styles.buttonLabel}>New</p>
            <button
              className={styles.actionButton}
              onClick={() => navigate(`${postPathPrefix}/create`)}
            >
              New
            </button>
          </div>
        }
      />
      <TableBody
        columns={columns}
        rows={storePosts}
        className={styles.tableBody}
      />
    </Card>
  );
}
