import { Button } from '@/components/forms';
import { IOrderItem } from '../Orders';

import styles from './OrderItem.module.scss';
import { SERVER_URL } from '@/config/global';

export function OrderItem({
    _id,
    vendor,
    product,
    deliveryType,
    orderID,
    status
}: IOrderItem) {
    const vendorLogoUrl = `${SERVER_URL}/${vendor?.images?.logoUrl || ''}`;
    return <div className={styles.root}>
        <div className={styles.vendor}>
            <img src={vendorLogoUrl} alt="Vendor logo" />
            <div className={styles.info}>
                <p className={styles.title}>{vendor.business.name}</p>
                <p className={styles.orderID}>Order ID: <span>{orderID}</span></p>
            </div>
        </div>
        <div className={styles.delivery}>
            <p className={styles.title}>Delivery Type</p>
            <p className={styles.content}>{deliveryType}</p>
        </div>
        <div className={styles.subtotal}>
            <p className={styles.title}>Subtotal</p>
            <p className={styles.content}>${product.subtotal}</p>
        </div>
        <Button className={styles.detailBtn}>Order Details</Button>
    </div>
}