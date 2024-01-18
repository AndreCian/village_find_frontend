import { useMemo } from 'react';
import { Container } from '@/components/layout/customer';
import { ProductCard } from '@/components/customer/common';

import { useWindowWidth } from '@/utils';

import styles from './FeaturedItems.module.scss';

export interface IFeaturedItem {
  title: string;
  name: string;
  price: number;
  tags: string[];
  image: string;
  description: string;
  link: string;
}

export const initialFeaturedItems = [] as IFeaturedItem[];

export function FeaturedItems({ items }: { items: IFeaturedItem[] }) {
  const minBreakLists = ['none', 'xs'];

  const [_, breakpoint] = useWindowWidth();
  const isMobile = useMemo(() => {
    return minBreakLists.includes(breakpoint as string);
  }, [breakpoint]);

  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        <h1>Featured Items</h1>
        <div className={styles.featuredItems}>
          {items
            .slice(0, items.length - 1)
            .map((product: any, index: number) => (
              <ProductCard
                key={`${product.name}-${index}`}
                product={product}
                isActive={isMobile}
                className={styles.featuredItem}
              />
            ))}
          {!isMobile && !!items.length && (
            <ProductCard isLoadMore={true} product={items.reverse()[0]} />
          )}
        </div>
        {isMobile && (
          <>
            <h1>More To Discover</h1>
            <div className={styles.moreItems}>
              {items
                .slice(0, items.length - 1)
                .map((product: any, index: number) => (
                  <ProductCard
                    key={`${product.name}-${index}`}
                    product={product}
                    isActive={true}
                  />
                ))}
              {!!items.length && (
                <ProductCard isLoadMore={true} product={items.reverse()[0]} />
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
