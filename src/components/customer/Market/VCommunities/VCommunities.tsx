import { Container } from '@/components/layout/customer';

import ShopVComImage from '/assets/customer/backs/shopvcom.png';
import styles from './VCommunities.module.scss';

const initialCommunities = [
  {
    name: 'Field Of Artisans',
    detail: 'Over 600 artisans making unique one-of-a-kind items.',
    category: 'Wood Working',
    image: ShopVComImage,
  },
  {
    name: 'Field Of Artisans',
    detail: 'Over 600 artisans making unique one-of-a-kind items.',
    category: 'Wood Working',
    image: ShopVComImage,
  },
  {
    name: 'Field Of Artisans',
    detail: 'Over 600 artisans making unique one-of-a-kind items.',
    category: 'Wood Working',
    image: ShopVComImage,
  },
  {
    name: 'Field Of Artisans',
    detail: 'Over 600 artisans making unique one-of-a-kind items.',
    category: 'Wood Working',
    image: ShopVComImage,
  },
];

export function VCommunities() {
  return (
    <Container className={styles.root}>
      <div className={styles.head}>
        <h1>Vendor Communities</h1>
        <p>
          Fresher Choice’s new Vendor Communities initiative empowers local
          people to organize small makers and growers in their communities to
          help them connect with people like you looking for what they’re
          selling.
        </p>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Shop Vendor Communities</p>
        <div className={styles.communities}>
          {initialCommunities.map((community: any, index: number) => (
            <div key={`shop-v-com-${index}`} className={styles.shopvcom}>
              <img src={community.image} />
              <div className={styles.vcomText}>
                <p className={styles.name}>{community.name}</p>
                <span className={styles.detail}>{community.detail}</span>
                <p className={styles.catLabel}>Category</p>
                <span className={styles.category}>{community.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
