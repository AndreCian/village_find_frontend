import { useState } from 'react';
import clsx from 'clsx';

import styles from './ProductMoreDetail.module.scss';

const initialDetail = {
  category: 'Hand Forged',
  glanceDesc:
    'Ready within 2 hours for pickup inside the store We’ll hold orders with for 24 hours. After that your order will be refunded.',
  description:
    'Our flagship knife. Crafted for perfect balance, ease of use, and maximum performance. Toss out that old dull knife and work with the tool your kitchen deserves. The perfect all in one. Perfectly balanced along the entire length for comfort and grace in performance. The octagonal handle offers supreme grip no matter the situation or ingredients and fits perfectly in large and small hands, lefty or righty. True to Japanese and Asian style, our knives are low in weight for delicacy in execution. The 17 degree angle, tighter than that of German knives, allows you to glide through ingredients with ease. Higher carbon levels allow for easy sharpening and more precise edges. Our 8” Gyuto Chef Knife Features 5 layer Sanmai Japanese VG10 High Carbon Stainless Steel. Octagonal Rosewood handle, comfortable in any size hand, lefty or righty. Offering superior grip without compromising comfort.',
  specification: {
    contains: "Chef's Knife",
    weight: 12,
    length: 8,
    materials: 'VG10 Steel',
    make: 'Hand Forged',
    cleaning: 'Hand wash with dish soap',
  },
  disclaimer:
    'If you would like to return your items you have ordered, please reach out to our team at orders@ftg.com',
  vendorStory:
    'Kitchen knives developed by industry professionals and handcrafted by third-generation blade smiths. Every knife is handcrafted to give you a unique blade at remarkable prices. Founded in 2017 by California Chef Noah Rosen. In pursuit of the perfect affordable blades for culinary students and emerging chefs, the flagship Gyuto was designed, forged, and rigorously tested while Noah attended Johnson & Wales University. Since then, Forge To Table has grown to become the chosen knife of thousands of chefs and cooks globally.',
};

const specKeys = [
  { name: 'Contains', key: 'contains' },
  { name: 'Weight', key: 'weight' },
  { name: 'Length', key: 'length' },
  { name: 'Materials', key: 'materials' },
  { name: 'Make', key: 'make' },
  { name: 'Cleaning', key: 'cleaning' },
];

export function ProductMoreDetail() {
  const [productDetail, setProductDetail] = useState(initialDetail);

  return (
    <div className={styles.root}>
      <p className={styles.head}>About this item</p>
      <div className={styles.navItem}>
        <p>More Details</p>
        <div />
      </div>
      <div className={clsx(styles.card, styles.glance)}>
        <p className={styles.head}>At a glance</p>
        <span className={styles.variant}>{productDetail.category}</span>
        <p className={styles.body}>{productDetail.glanceDesc}</p>
      </div>
      <div className={clsx(styles.card, styles.description)}>
        <p className={styles.head}>Description</p>
        <p className={styles.body}>{productDetail.description}</p>
      </div>
      <div className={clsx(styles.card, styles.extra)}>
        <div className={styles.secondaryCard}>
          <div className={styles.specifications}>
            <p className={styles.head}>Specifications</p>
            <div className={styles.body}>
              {specKeys.map((item: any, index: number) => (
                <div key={`detail-item-${index}`} className={styles.detItem}>
                  <p className={styles.head}>{item.name}</p>
                  <p className={styles.body}>
                    {(initialDetail.specification as any)[item.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.disclaimers}>
            <p className={styles.head}>Disclaimers</p>
            <p className={styles.body}>{initialDetail.disclaimer}</p>
          </div>
        </div>
        <div className={styles.story}>
          <p className={styles.head}>Vendor Story</p>
          <p className={styles.body}>{initialDetail.vendorStory}</p>
        </div>
      </div>
    </div>
  );
}
