import { FaMinus, FaPlus } from 'react-icons/fa6';
import clsx from 'clsx';

import { Button, Select } from '@/components/forms';
import { TrashIcon } from '@/components/icons';
import { IOrder } from './MyCart';
import { SERVER_URL } from '@/config/global';

import styles from './CartItem.module.scss';
import { HttpService } from '@/services';
import { enqueueSnackbar } from 'notistack';

const initialFrequencies = [
  'Every month',
  'Every 2 months',
  'Every 3 months',
  'Every 6 months',
];

export function CartItem({
  products,
  orderId,
  shopName,
  orderTotalPrice,
  deliveryOptions,
}: IOrder) {
  // const marketTypes = useMemo(() => {
  //   return [...new Set(products.map((item: any) => item.marketType as string))];
  // }, [products]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  };

  const onMinusClick = (product: any) => () => {
    if (product.quantity === 0) return;
    HttpService.put(`/cart/${product.cartId}`, {
      quantity: product.quantity - 1,
    }).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('Quantity updated.', { variant: 'success' });
      }
    });
  };

  const onPlusClick = (product: any) => () => {
    HttpService.put(`/cart/${product.cartId}`, {
      quantity: product.quantity + 1,
    }).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('Quantity updated.', { variant: 'success' });
      }
    });
  };

  const onRemoveClick = (product: any) => () => {
    HttpService.delete(`/cart/${product.cartId}`).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('Product deleted in the cart.', { variant: 'success' });
      }
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.vendor}>
          {/* <img src={`${SERVER_URL}/${shopLogoPath}`} /> */}
          <div className={styles.order}>
            <p className={styles.name}>{shopName}</p>
            <p className={styles.orderId}>
              Order ID: <span>{orderId}</span>
            </p>
          </div>
        </div>
        <div className={styles.delivery}>
          <p className={styles.title}>Delivery Options</p>
          <p className={styles.body}></p>
        </div>
        <div className={styles.subtotal}>
          <p className={styles.title}>Subtotal</p>
          <p className={styles.body}>${(orderTotalPrice || 0).toFixed(2)}</p>
        </div>
      </div>
      <div className={styles.products}>
        {products.map((product: any, index: number) => (
          <div key={index} className={styles.product}>
            <div className={styles.main}>
              <div className={styles.imageBar}>
                <img
                  src={`${SERVER_URL}/${product.image}`}
                  alt="The Product Image"
                />
                <div className={styles.quantity}>
                  <span
                    className={styles.minus}
                    onClick={onMinusClick(product)}
                  >
                    <FaMinus fill="#3F3F3F" />
                  </span>
                  <p>{product.quantity}</p>
                  <span className={styles.plus} onClick={onPlusClick(product)}>
                    <FaPlus fill="white" />
                  </span>
                </div>
              </div>
              <div className={styles.majorInfo}>
                <div className={styles.heading}>
                  <p className={styles.title}>{product.name}</p>
                  <p className={styles.pricePerUnit}>
                    Minimum 1 Bunch at ${(product.price || 0).toFixed(2)}/
                    {product.soldByUnit}
                  </p>
                </div>
                <div className={styles.price}>
                  <p className={styles.title}>Price</p>
                  <p className={styles.body}>
                    $
                    {(product.price || 0)
                      // (product.personalization &&
                      //   product.personalization.fee) || 0
                      .toFixed(2)}
                  </p>
                </div>
                {(product.deliveryTypes || []).includes('Shipping') && (
                  <div className={styles.shipping}>
                    <div className={styles.gift}>
                      <div className={styles.heading}>
                        <p className={styles.title}>Would you like to</p>
                        <div className={styles.body}>
                          <Button className={styles.giftBtn}>
                            <p className={styles.label}>It's as gift</p>
                            <span>
                              <img src="/assets/customer/svgs/gift.svg" />
                            </span>
                          </Button>
                          {product.subscription && (
                            <Select
                              options={initialFrequencies}
                              placeholder="Subscribe"
                              className={styles.subscSelect}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.extra}>
                      <div className={styles.style}>
                        {product.attrModels.map((attribute: any) => (
                          <p className={styles.attr} key={attribute._id}>
                            <span>{attribute.name}: </span>
                            {product.attrValues[attribute._id]}
                          </p>
                        ))}
                      </div>
                      {product.personalization && (
                        <div className={styles.personalization}>
                          <p className={styles.title}>Personalized: </p>
                          <p className={styles.body}>
                            {product.personalization.message}
                          </p>
                          <span className={styles.expandBtn}>Expand</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* {product.subscription && (
                  <div className={styles.subscription}>
                    <p className={styles.head}>Would you like to</p>
                    <div className={styles.body}>
                      <div className={styles.text}>
                        <span>Subscribed:</span>
                        <p>{product.subscription?.subscribed}</p>
                      </div>
                      <div className={clsx(styles.text, styles.duration)}>
                        <span>Subscription Duration:</span>
                        <p>
                          {product.subscription.duration} weeks from{' '}
                          {formatDate(product.subscription.startDate)} -{' '}
                          {formatDate(product.subscription.endDate)}
                        </p>
                      </div>
                      <div className={clsx(styles.text, styles.frequency)}>
                        <span>Subscription Frequency:</span>
                        <p>{product.subscription.frequency}</p>
                      </div>
                      <p className={styles.text}>
                        Your card will be charged{' '}
                        <span>
                          {product.price * product.subscription.duration} every{' '}
                          {product.subscription.duration} weeks
                        </span>{' '}
                        or until cancelation
                      </p>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
            <div className={styles.action}>
              <p className={styles.removeBtn} onClick={onRemoveClick(product)}>
                Remove
                <span>
                  <TrashIcon />
                </span>
              </p>
              <div className={styles.pricing}>
                <div className={styles.quantity}>
                  <span
                    className={styles.minus}
                    onClick={onMinusClick(product)}
                  >
                    <FaMinus fill="#3F3F3F" />
                  </span>
                  <p>{product.quantity}</p>
                  <span className={styles.plus} onClick={onPlusClick(product)}>
                    <FaPlus fill="white" />
                  </span>
                </div>
                <div className={styles.price}>
                  <p className={styles.title}>Price</p>
                  <p className={styles.body}>
                    ${(product.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <p className={styles.title}>Delivery Options</p>
        <div className={styles.buttons}>
          {/* {['Shipping', 'Home Delivery', 'Pickup Location', 'Safe Pickup'].map(
            (item: string, index: number) => (
              <Button
                key={index}
                className={clsx(
                  styles.button,
                  !deliveryOptions.includes(item) ? 'hidden' : '',
                )}
              >
                {item}
              </Button>
            ),
          )} */}
        </div>
      </div>
    </div>
  );
}
