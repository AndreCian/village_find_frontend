import { useState, useMemo } from 'react';
import { FaChevronRight } from 'react-icons/fa6';

import { Button } from '@/components/forms';
import { Rater } from '@/components/common';

import {
  ReviewListItem,
  WriteReview,
} from '@/components/customer/ProductDetails';
import { ProductCard } from '@/components/customer/common';
import { CartDialog } from '../../common/CartDialog';

import { useWindowWidth } from '@/utils';

import styles from './AuthenticReviews.module.scss';

const initialReviews = [
  {
    rating: 5,
    reviewedAt: new Date('April 22, 2023'),
    title: 'April Cohen',
    body: "I mean it's really good but I would like a little bolder taste I am still drinking it though it's not a complaint just a helpful suggestion",
    isVerified: true,
  },
  {
    rating: 5,
    reviewedAt: new Date('April 22, 2023'),
    title: 'April Cohen',
    body: "I mean it's really good but I would like a little bolder taste I am still drinking it though it's not a complaint just a helpful suggestion",
    isVerified: true,
  },
  {
    rating: 5,
    reviewedAt: new Date('April 22, 2023'),
    title: 'April Cohen',
    body: "I mean it's really good but I would like a little bolder taste I am still drinking it though it's not a complaint just a helpful suggestion",
    isVerified: true,
  },
];

const initialProducts = [
  {
    image: '/assets/customer/products/product1.png',
    name: 'Mystery Awesome Box',
    place: "Lilly's Jewels",
    price: 20,
  },
  {
    image: '/assets/customer/products/product2.png',
    name: 'Mystery Awesome Box',
    place: "John's Farm Stand",
    price: 20,
  },
  {
    image: '/assets/customer/products/product3.png',
    name: 'Mystery Awesome Box',
    place: "John's Farm Stand",
    price: 20,
  },
  {
    image: '/assets/customer/products/product4.png',
    name: 'Mystery Awesome Box',
    place: "John's Farm Stand",
    price: 20,
  },
];

const initialCommunities = [
  {
    name: 'Field Of Artisans',
    detail: 'Over 600 artisans making unique one-of-a-kind items.',
    category: 'Wood Working',
    image: '/assets/customer/backs/shopvcom.png',
  },
  {
    name: 'Field Of Artisans',
    detail: 'Over 600 artisans making unique one-of-a-kind items.',
    category: 'Wood Working',
    image: '/assets/customer/backs/shopvcom.png',
  },
  {
    name: 'Field Of Artisans',
    detail: 'Over 600 artisans making unique one-of-a-kind items.',
    category: 'Wood Working',
    image: '/assets/customer/backs/shopvcom.png',
  },
  {
    name: 'Field Of Artisans',
    detail: 'Over 600 artisans making unique one-of-a-kind items.',
    category: 'Wood Working',
    image: '/assets/customer/backs/shopvcom.png',
  },
];

export function AuthenticReviews() {
  const [customRating] = useState(3.5);
  const [totalRatings] = useState<any[]>([
    {
      rating: 1,
      percent: 20,
    },
    {
      rating: 2,
      percent: 20,
    },
    {
      rating: 3,
      percent: 20,
    },
    {
      rating: 4,
      percent: 20,
    },
    {
      rating: 5,
      percent: 20,
    },
  ]);
  const [isReviewed, setIsReviewed] = useState(false);

  const minBreakLists = ['none', 'xs'];
  const [_, breakpoint] = useWindowWidth();
  const isMobile = useMemo(() => {
    return minBreakLists.includes(breakpoint as string);
  }, [breakpoint]);

  const onSwitchReview = () => {
    setIsReviewed(!isReviewed);
  };

  return (
    <div className={styles.root}>
      <p className={styles.head}>Authentic Member Reviews</p>
      <div className={styles.reviewBar}>
        <div className={styles.customer}>
          <div className={styles.rating}>
            <Rater rating={customRating} />
            <p>{customRating} out of 5</p>
          </div>
          <p className={styles.text}>Out of 100 customers</p>
        </div>
        <div className={styles.total}>
          {totalRatings.map((item: any, index: number) => (
            <div key={index} className={styles.reviewItem}>
              <Rater rating={item.rating} />
              <div className={styles.progress}>
                <div
                  style={{ width: `${item.percent}%` }}
                  className={styles.loading}
                ></div>
              </div>
              <p>{item.percent}</p>
            </div>
          ))}
        </div>
        <div className={styles.button}>
          <Button className={styles.cancelBtn} onClick={onSwitchReview}>
            {isReviewed ? 'Cancel Review' : 'Write Review'}
          </Button>
        </div>
      </div>
      <div className={styles.writeReview}>
        <WriteReview />
      </div>
      <div className={styles.reviewList}>
        <div className={styles.reviews}>
          {initialReviews.map((review: any, index: number) => (
            <ReviewListItem key={index} {...review} />
          ))}
        </div>
        <Button className={styles.loadBtn}>Load More</Button>
      </div>
      <div className={styles.mightLike}>
        <p className={styles.title}>You might also like</p>
        <div className={styles.products}>
          {initialProducts
            .slice(0, initialProducts.length - 1)
            .map((product: any, index: number) => (
              <ProductCard
                key={`${product.name}-${index}`}
                isActive={isMobile}
                product={product}
                className={styles.featuredItem}
              />
            ))}
          <ProductCard
            isLoadMore={true}
            product={initialProducts.reverse()[0]}
          />
        </div>
      </div>
      <div className={styles.shopCommunities}>
        <p className={styles.title}>Shop Communities</p>
        <div className={styles.communities}>
          {initialCommunities.map((shopVCommunity: any, index: number) => (
            <div key={`shop-v-com-${index}`} className={styles.shopvcom}>
              <img src={shopVCommunity.image} />
              <div className={styles.vcomText}>
                <p className={styles.name}>{shopVCommunity.name}</p>
                <span className={styles.detail}>{shopVCommunity.detail}</span>
                <p className={styles.catLabel}>Category</p>
                <span className={styles.category}>
                  {shopVCommunity.category}
                </span>
              </div>
            </div>
          ))}
          <span className={styles.nextIcon}>
            <FaChevronRight fill="white" />
          </span>
        </div>
      </div>
    </div>
  );
}
