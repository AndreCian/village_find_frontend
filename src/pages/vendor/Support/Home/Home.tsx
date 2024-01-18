import { useNavigate } from 'react-router-dom';

import { Card } from '@/components/common';
import { Input } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';

import supportImg from '/assets/vendor/backs/support.png';
import postImg1 from '/assets/vendor/backs/post2.png';
import postImg2 from '/assets/vendor/backs/post2.png';
import postImg3 from '/assets/vendor/backs/post3.png';
import styles from './Home.module.scss';

interface IPost {
  title: string;
  topic: string;
  image: string;
}

const recentPosts: IPost[] = [
  {
    title: 'Ways to Grow Your Business',
    topic: 'Growth',
    image: postImg1,
  },
  {
    title: 'Ways to Grow Your Business',
    topic: 'Saving',
    image: postImg2,
  },
  {
    title: 'Ways to Grow Your Business',
    topic: 'Revenue',
    image: postImg3,
  },
];

const lastPosts: IPost[] = [
  {
    title: 'Ways to Grow Your Business',
    topic: 'Growth',
    image: postImg1,
  },
  {
    title: 'Ways to Grow Your Business',
    topic: 'Saving',
    image: postImg2,
  },
  {
    title: 'Ways to Grow Your Business',
    topic: 'Revenue',
    image: postImg3,
  },
];

const detailPath = '/vendor/support/detail';

export function SupportHome() {
  const navigate = useNavigate();

  return (
    <Card className={styles.root}>
      <div className={styles.backImage}>
        <img src={supportImg} />
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Support Blog</h1>
          <Input
            rounded="full"
            border="none"
            bgcolor="secondary"
            placeholder="Search for a topic"
            className={styles.searchInput}
            adornment={{
              position: 'right',
              content: <MagnifierIcon />,
            }}
          />
        </div>
        <div className={styles.posts}>
          <div className={styles.postPanel}>
            <h2>Most Recent Posts</h2>
            <div className={styles.panelBody}>
              {recentPosts.map((post: IPost, index: number) => (
                <div
                  key={`${post.title}-${index}`}
                  className={styles.postItem}
                  onClick={() => navigate(detailPath)}
                >
                  <img src={post.image} className={styles.image} />
                  <div className={styles.content}>
                    <p>{post.title}</p>
                    <p>
                      Topic: <span>{post.topic}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.postPanel}>
            <h2>Last Week</h2>
            <div className={styles.panelBody}>
              {lastPosts.map((post: IPost, index: number) => (
                <div
                  key={`${post.title}-${index}`}
                  className={styles.postItem}
                  onClick={() => navigate(detailPath)}
                >
                  <img src={post.image} className={styles.image} />
                  <div className={styles.content}>
                    <p>{post.title}</p>
                    <p>
                      Topic: <span>{post.topic}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
