import clsx from 'clsx';
import { FaChevronRight } from 'react-icons/fa6';

import styles from './ProductCard.module.scss';
import { SERVER_URL } from '@/config/global';

interface IProduct {
  image: string;
  title: string;
  name: string;
  price: number;
  totprice?: number;
  tags?: string[];
}

export interface IProductCardProps {
  product: IProduct;
  isLoadMore?: boolean;
  isActive?: boolean;
  className?: string;
}

const tagClass = {
  near: 'bg-info',
  subscription: 'bg-GRay',
};

export function ProductCard({
  isLoadMore = false,
  isActive = false,
  className = '',
  product,
}: IProductCardProps) {
  const { image, name, title, price, totprice, tags } = product;

  return (
    <div
      className={clsx(
        styles.root,
        isActive || isLoadMore ? styles.active : '',
        className,
      )}
    >
      <div className={styles.image}>
        <object data={`${SERVER_URL}/${image}`} type="image/png">
          <img src={image} alt="Fallback image" />
        </object>
        {isLoadMore && (
          <p className={styles.moreContext}>
            Load More
            <span>
              <FaChevronRight fill="white" />
            </span>
          </p>
        )}
      </div>
      <h1>{title}</h1>
      <p>{name}</p>
      <div className={styles.prices}>
        <span className={styles.price}>${price.toFixed(2)}</span>
        {totprice && (
          <>
            <span className={styles.totprice}>${totprice.toFixed(2)}</span>
            <span className={styles.discount}>{`${Math.round(
              (price / totprice) * 100,
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
