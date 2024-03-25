import { useNavigate } from 'react-router-dom';

import { ProductCard } from '@/components/customer/common';

import styles from './ProductList.module.scss';

interface IProductListProps {
  products: any[];
  isMobile: boolean;
}

function ProductList({ products, isMobile }: IProductListProps) {
  const navigate = useNavigate();

  const onProductClick = (id: string) => {
    if (!id) return;
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className={styles.products}>
      {products.map((product: any, index: number) => (
        <ProductCard
          key={`product-${index}`}
          product={product}
          isActive={isMobile}
          navigateToDetail={() => onProductClick(product._id)}
        />
      ))}
    </div>
  );
}

export { ProductList };
