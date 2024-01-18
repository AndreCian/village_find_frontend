import { Container } from '@/components/layout/customer';
import {
  ProductInfo,
  ProductMoreDetail,
  AuthenticReviews,
} from '@/components/customer/ProductDetails';

import styles from './ProductDetails.module.scss';

export function ProductDetails() {
  return (
    <Container className={styles.root}>
      <ProductInfo />
      <ProductMoreDetail />
      <AuthenticReviews />
    </Container>
  );
}
