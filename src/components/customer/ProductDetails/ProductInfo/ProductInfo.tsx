import { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa6';

import { ImageUpload, Select, TextField, Button } from '@/components/forms';

import styles from './ProductInfo.module.scss';
import TopicImage from '/assets/customer/products/detTopic.png';
import { HttpService } from '@/services';
import { enqueueSnackbar } from 'notistack';
import { AuthContext } from '@/providers';

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
  custom?: {
    text: string;
    fee: number;
  };
  images: string[];
  productStyles: IProductStyle[];
}

interface IProduct {
  productId: string;
  styleId: string;
  unit: string;
  quantity: number;
}

interface IAttribute {
  _id: string;
  name: string;
  values: string[];
}

interface IInventory {
  _id: string;
  attrs: any;
}

interface IProductStyle {
  _id: string;
  name: string;
  attributes: IAttribute[];
  inventories: IInventory[];
}

export function ProductInfo({
  name,
  shopName,
  community,
  price,
  discount,
  minimumCnt,
  pricePerCnt,
  custom,
  images,
  productStyles,
}: IProductInfo) {
  const { id: productId } = useParams();

  const { account } = useContext(AuthContext);
  const [product, setProduct] = useState<IProduct>({
    productId: productId as string,
    styleId: '',
    unit: '',
    quantity: 0,
  });
  const [attributes, setAttributes] = useState<
    {
      _id: string;
      value: string;
    }[]
  >([]);

  const offPrice = useMemo(() => {
    return ((price * (100 - discount)) / 100.0).toFixed(2);
  }, [price, discount]);

  const currentStyle = useMemo(() => {
    const style = productStyles.find(
      (item: IProductStyle) => item._id === product.styleId,
    );
    return style;
  }, [product.styleId]);

  const onMinusClick = () => {
    if (product.quantity === 0) return;
    setProduct({ ...product, quantity: product.quantity - 1 });
  };

  const onPlusClick = () => {
    setProduct({ ...product, quantity: product.quantity + 1 });
  };

  const onStyleChange = (id: string) => {
    setProduct({ ...product, styleId: id });
  };

  const onAddCartClick = () => {
    if (!currentStyle) {
      enqueueSnackbar('Please select one of product styles.', {
        variant: 'warning',
      });
      return;
    }
    if (currentStyle.attributes.length != Object.keys(attributes).length) {
      enqueueSnackbar('Please select product attributes.', {
        variant: 'warning',
      });
      return;
    }

    const currentInventory = currentStyle.inventories.find((item: IInventory) =>
      attributes.every(
        (attribute: { _id: string; value: string }) =>
          item.attrs[attribute._id] === attribute.value,
      ),
    );
    if (!currentInventory) {
      enqueueSnackbar('Invalid product attribute selection.', {
        variant: 'warning',
      });
      return;
    }

    HttpService.post(`/cart`, {
      productId,
      customerId: account?.profile._id,
      styleId: product.styleId,
      inventoryId: currentInventory._id,
      quantity: product.quantity,
    }).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('One item added to cart!', { variant: 'success' });
      }
    });
  };

  const onAttributeChange = (attrId: string) => (value: string) => {
    if (attributes.find(item => item._id === attrId)) {
      setAttributes(
        attributes.map(item =>
          item._id === attrId ? { _id: item._id, value } : item,
        ),
      );
    } else {
      setAttributes([...attributes, { _id: attrId, value }]);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.link}>
        <p className={styles.toVendor}>{shopName}</p>
        <p className={styles.toCommunity}>{community?.name}</p>
      </div>
      <div className={styles.blank}></div>
      <div className={styles.images}>
        <div className={styles.smallImages}>
          {images.map((image: string, index: number) => (
            <img key={`small-image-${index}`} src={image} />
          ))}
        </div>
        <img src={images[0] || TopicImage} className={styles.topicImage} />
      </div>
      <div className={styles.info}>
        <div className={styles.head}>
          <p>{name}</p>
        </div>
        <div className={styles.style}>
          <p className={styles.lowerPrice}>${offPrice}</p>
          <p className={styles.realPrice}>
            <span className={styles.totalPrice}>${price.toFixed(2)}</span>{' '}
            <span className={styles.discount}>
              {(100 - discount).toFixed(2)}%
            </span>
          </p>
          <p className={styles.centPrice}>
            Minimum {minimumCnt} cnt at ${pricePerCnt}/cnt
          </p>
          <div className={styles.style}>
            <Select
              placeholder="Style"
              options={productStyles.map(style => ({
                ...style,
                value: style._id,
              }))}
              value={product.styleId}
              updateValue={onStyleChange}
              className={styles.styleSelect}
            />
            {currentStyle &&
              currentStyle.attributes.map((attribute: IAttribute) => (
                <Select
                  className={styles.styleSelect}
                  placeholder={attribute.name}
                  options={attribute.values}
                  value={
                    attributes.find(item => item._id === attribute._id)
                      ?.value || ''
                  }
                  updateValue={onAttributeChange(attribute._id)}
                />
              ))}
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
            Personalization Fee: <span>${custom?.fee}</span>
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
          <span className={styles.minus} onClick={onMinusClick}>
            <FaMinus size={20} />
          </span>
          <p>{product.quantity}cnt</p>
          <span className={styles.plus} onClick={onPlusClick}>
            <FaPlus size={20} fill="white" />
          </span>
        </div>
        <Button className={styles.addToCartBtn} onClick={onAddCartClick}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
