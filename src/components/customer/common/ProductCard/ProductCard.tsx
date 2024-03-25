import clsx from 'clsx';
import { FaChevronRight } from 'react-icons/fa6';

import { SERVER_URL } from '@/config/global';

import styles from './ProductCard.module.scss';
import FallbackImage from '/assets/customer/backs/about.png';

interface IProduct {
  image: string;
  shopName: string;
  name: string;
  price?: number;
  totprice?: number;
  tags?: string[];
}

export interface IProductCardProps {
  product: IProduct;
  isLoadMore?: boolean;
  isActive?: boolean;
  className?: string;
  navigateToDetail: () => void;
}

const tagClass = {
  near: 'bg-info',
  subscription: 'bg-GRay',
};

export function ProductCard({
  isLoadMore = false,
  isActive = false,
  className = '',
  navigateToDetail = () => {},
  product,
}: IProductCardProps) {
  const { image, name, shopName, price, totprice, tags } = product;

  return (
    <div
      className={clsx(
        styles.root,
        isActive || isLoadMore ? styles.active : '',
        className,
      )}
      onClick={navigateToDetail}
    >
      <div className={styles.image}>
        <img src={`${SERVER_URL}/${image}`} alt="Product image" />
        {isLoadMore && (
          <p className={styles.moreContext}>
            Load More
            <span>
              <FaChevronRight fill="white" />
            </span>
          </p>
        )}
      </div>
      <h1>{name}</h1>
      <p>{shopName}</p>
      <div className={styles.prices}>
        <span className={styles.price}>${(price || 0).toFixed(2)}</span>
        {totprice && (
          <>
            <span className={styles.totprice}>${totprice.toFixed(2)}</span>
            <span className={styles.discount}>{`${Math.round(
              ((price || 0) / (totprice || 1)) * 100,
            )}% off`}</span>
          </>
        )}
      </div>
      <div className={styles.tags}>
        {tags?.map((tag: string, index: number) => (
          <span
            key={`tag-${index}`}
            className={clsx(
              styles.tag,
              tagClass[
                tag.toLowerCase().split(' ')[0] as 'near' | 'subscription'
              ],
            )}
          >
            {tag}
          </span>
        ))}
      </div>
      {isLoadMore && <div className={styles.grayLayer} />}
    </div>
  );
}
