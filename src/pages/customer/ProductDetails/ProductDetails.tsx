import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@/components/layout/customer';
import {
  ProductInfo,
  ProductMoreDetail,
  AuthenticReviews,
} from '@/components/customer/ProductDetails';
import { HttpService } from '@/services';

import styles from './ProductDetails.module.scss';

interface IProductInfo {
  name: string;
  shopName: string;
  community?: {
    name: string;
    slug: string;
  };
  price: number;
  discount: number;
  minimumCnt: number;
  pricePerCnt: number;
  isPersonalize: boolean;
  custom?: {
    text: string;
    fee: number;
  };
  images: string[];
  productStyles: {
    _id: string;
    name: string;
    attributes: {
      _id: string;
      name: string;
      values: string[];
    }[];
    inventories: {
      _id: string;
      attrs: any;
    }[];
  }[];
}

const initialProductInfo: IProductInfo = {
  name: '',
  shopName: '',
  price: 0,
  discount: 0,
  minimumCnt: 0,
  pricePerCnt: 0,
  isPersonalize: false,
  images: [],
  productStyles: [],
};

export function ProductDetails() {
  const { id: productId } = useParams();
  const [productInfo, setProductInfo] =
    useState<IProductInfo>(initialProductInfo);

  useEffect(() => {
    HttpService.get(`/products/customer/${productId}`).then(response => {
      const { status, product } = response;
      if (status === 200) {
        setProductInfo({
          ...product,
          price: 0,
          discount: 0,
          minimumCnt: 0,
          pricePerCnt: 0,
          isPersonalize: !!product.customization,
          images: [],
          productStyles: product.styles,
        });
      }
    });
  }, []);

  return (
    <Container className={styles.root}>
      <ProductInfo {...productInfo} />
      <ProductMoreDetail />
      <AuthenticReviews />
    </Container>
  );
}
