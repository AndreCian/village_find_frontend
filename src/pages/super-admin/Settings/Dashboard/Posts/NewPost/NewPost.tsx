import { ChangeEvent, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Card } from '@/components/common';
import { ImageUpload, Input, TextField } from '@/components/forms';

import { PostService } from '@/services';

import { usePostStore } from '@/stores';

import { IPost, ImageType } from '@/interfaces';

import styles from './NewPost.module.scss';

interface INewPost {
  title: string;
  topic: string;
  body?: string;
  thumbImg?: ImageType;
  largeImg?: ImageType;
}

const initialNewPost: INewPost = {
  title: '',
  topic: '',
  body: '',
  thumbImg: '',
  largeImg: '',
};
const initialPost: IPost = {
  name: '',
  topic: '',
  status: '',
};

const backToPath = '/admin/settings/dashboard/posts';

export function NewPost() {
  const { id: postId }: any = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<IPost>(initialPost);
  const [newPost, setNewPost] = useState<INewPost>(initialNewPost);
  const { updatePost: updateStorePost } = usePostStore();

  const updatePost = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    setPost({ ...post, [field]: e.target.value });
  };

  const updateNewPost = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    setNewPost({ ...newPost, [field]: e.target.value });
  };

  const onCreateClick = () => {
    if (postId === 'create') {
      PostService.createOne(post).then(() => {
        navigate(backToPath);
      });
    } else {
      PostService.updateOne(postId, post).then(() => {
        updateStorePost(postId, post as IPost);
        navigate(backToPath);
      });
    }
  };

  useEffect(() => {
    if (postId && postId !== 'create') {
      PostService.findOne(postId).then(post => {
        setPost(post);
      });
    }
  }, [postId]);

  return (
    <Card title="Support Center" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.control}>
            <p>Title</p>
            <Input
              value={post.name}
              updateValue={(e: ChangeEvent<HTMLInputElement>) =>
                updatePost(e, 'name')
              }
              placeholder="Title"
            />
          </div>
          <div className={styles.control}>
            <p>Topic</p>
            <Input
              value={post.topic}
              updateValue={(e: ChangeEvent<HTMLInputElement>) =>
                updatePost(e, 'topic')
              }
              placeholder="Topic"
            />
          </div>
        </div>
        <div className={styles.images}>
          <h2>Thumbnail Image</h2>
          <ImageUpload
            exWidth={323}
            exHeight={191}
            updateBaseImage={() => {}}
          />
          <h2>Thumbnail Image</h2>
          <ImageUpload
            exWidth={674}
            exHeight={410}
            updateBaseImage={() => {}}
          />
        </div>
      </div>
      <div className={styles.bodyControl}>
        <p>Body</p>
        <TextField
          rows={15}
          placeholder="Body"
          value={newPost.body}
          updateValue={(e: ChangeEvent<HTMLTextAreaElement>) =>
            updateNewPost(e, 'body')
          }
          className={styles.bodyInput}
        />
      </div>
      <div className={styles.buttonBar}>
        <button
          className={styles.cancelButton}
          onClick={() => navigate(backToPath)}
        >
          Cancel
        </button>
        <button className={styles.addButton} onClick={onCreateClick}>
          {postId === 'create' ? 'Add' : 'Edit'}
        </button>
      </div>
    </Card>
  );
}
