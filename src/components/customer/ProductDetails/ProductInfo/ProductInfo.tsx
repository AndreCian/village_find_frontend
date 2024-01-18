import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';

import { ImageUpload, Select, TextField, Button } from '@/components/forms';

import styles from './ProductInfo.module.scss';

const initialProduct = {
  name: 'Jewelry',
  vendorName: 'Jewels By Shimmer',
  communityName: 'A Field of Artisans Vendor',
  images: [
    '/assets/customer/products/detSmall1.png',
    '/assets/customer/products/detSmall2.png',
  ],
  topicImage: '/assets/customer/products/detTopic.png',
  rating: 3.5,
  price: {
    totalPrice: 160,
    lowerPrice: 80,
    minimumCent: 1,
    dollarPerCent: 160,
  },
  color: 'Purple',
  personalFee: 8.99,
  quantity: 1,
};

export function ProductInfo() {
  const [product, setProduct] = useState(initialProduct);

  return (
    <div className={styles.root}>
      <div className={styles.link}>
        <p className={styles.toVendor}>{product.vendorName}</p>
        <p className={styles.toCommunity}>{product.communityName}</p>
      </div>
      <div className={styles.blank}></div>
      <div className={styles.images}>
        <div className={styles.smallImages}>
          {product.images.map((image: string, index: number) => (
            <img key={`small-image-${index}`} src={image} />
          ))}
        </div>
        <img src={product.topicImage} className={styles.topicImage} />
      </div>
      <div className={styles.info}>
        <div className={styles.head}>
          <p>{product.name}</p>
        </div>
        <div className={styles.style}>
          <p className={styles.lowerPrice}>
            ${product.price.lowerPrice.toFixed(2)}
          </p>
          <p className={styles.realPrice}>
            <span className={styles.totalPrice}>
              ${product.price.totalPrice.toFixed(2)}
            </span>{' '}
            <span className={styles.discount}>
              {(
                ((product.price.totalPrice - product.price.lowerPrice) /
                  product.price.totalPrice) *
                100
              ).toFixed(2)}
              %
            </span>
          </p>
          <p className={styles.centPrice}>
            Minimum {product.price.minimumCent} cnt at $
            {product.price.dollarPerCent}/cnt
          </p>
          <div className={styles.shape}>
            <Select placeholder="Style" />
            <Select placeholder="Medium" />
          </div>
        </div>
        <div className={styles.color}>
          <p>
            Color: <span>{product.color}</span>
          </p>
          <div className={styles.colorBlock}>
            <span className="block1"></span>
            <span className="block2"></span>
          </div>
        </div>
        <div className={styles.personalization}>
          <Select
            value="Add Personalization"
            options={['Add Personalization']}
            rounded="full"
            className={styles.personalSelect}
          />
          <p>
            Personalization Fee: <span>${product.personalFee}</span>
          </p>
        </div>
        <div className={styles.message}>
          <div className={styles.example}>
            <p>
              Leave me your info (pet name, phone NO. , address) for the
              engraving.
            </p>
            <p>For example:</p>
            <p>For Jenna, my love</p>
          </div>
          <div className={styles.msgInput}>
            <TextField rows={4} placeholder="Type here" />
            <span className={styles.letters}>500</span>
          </div>
        </div>
        <div className={styles.logo}>
          <p>Add your logo or image here</p>
          <ImageUpload exWidth={0} exHeight={0} />
        </div>
        <div className={styles.quantity}>
          <span className={styles.minus}>
            <FaMinus size={20} />
          </span>
          <p>{product.quantity}cnt</p>
          <span className={styles.plus}>
            <FaPlus size={20} fill="white" />
          </span>
        </div>
        <Button className={styles.addToCartBtn}>Add to Cart</Button>
      </div>
    </div>
  );
}
