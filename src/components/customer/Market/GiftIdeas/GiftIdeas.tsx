import { useEffect, useMemo, useState } from 'react';

import { Container } from '@/components/layout/customer';
import { Button } from '@/components/forms';
import { HttpService } from '@/services';
import { SERVER_URL } from '@/config/global';

import styles from './GiftIdeas.module.scss';

interface IGift {
  image: string,
  name: string,
  price: number,
  quantity: number,
  discount: number,
  subtotal: number,
  category: string,
  tags: string[],
  description: string,
  soldByUnit: string
}

export function GiftIdeas() {
  const [gifts, setGifts] = useState<IGift[]>([]);

  const discountPrice = useMemo(() => {
    if (!gifts || !gifts.length) return 0;
    return Math.floor(gifts[0].price * (100 - gifts[0].discount) / 100);
  }, [gifts]);

  useEffect(() => {
    HttpService.get('/products/gift').then(response => {
      const { gifts } = response;
      setGifts(gifts);
    });
  }, []);

  return (
    gifts && gifts.length > 0 ?
      <Container className={styles.root}>
        <div className={styles.wrapper}>
          <h1>Great gift ideas</h1>
          <div className={styles.container}>
            <div className={styles.image}>
              <img src={`${SERVER_URL}/${gifts[0]}`} />
            </div>
            <div className={styles.text}>
              <p className={styles.head}>{gifts[0].name}</p>
              <div className={styles.pricing}>
                <p className={styles.price}>${discountPrice.toFixed(2)}</p>
                <div className={styles.totprice}>
                  <span className={styles.totprice}>
                    ${gifts[0].subtotal.toFixed(2)}
                  </span>
                  <span className={styles.discount}>
                    {gifts[0].discount}% off
                  </span>
                </div>
                <p className={styles.minimum}>
                  Minimum 1lb at ${gifts[0].price.toFixed(2)}/{gifts[0].soldByUnit}
                </p>
              </div>
              <div className={styles.tags}>
                {gifts[0].tags.map((tag: string, index: number) => (
                  <span key={`tag-${index}`}>{tag}</span>
                ))}
              </div>
              <p>{gifts[0].description}</p>
              <Button className={styles.button}>Shop This Item</Button>
            </div>
          </div>
        </div>
      </Container> : null
  );
}
