import { useNavigate } from 'react-router-dom';

import styles from './VendorCard.module.scss';

interface IVendorCardProps {
  vendorId: string;
  backImage: string;
  logoImage: string;
  title: string;
  description: string;
  interest: string;
}

export function VendorCard({
  vendorId,
  backImage,
  logoImage,
  title,
  description,
  interest,
}: IVendorCardProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <div className={styles.backImage}>
        <img src={backImage} />
        <button className={styles.shopBtn}>Shop Now</button>
      </div>
      <div className={styles.community}>
        <div className={styles.image}>
          <img src={logoImage} />
        </div>
        <div className={styles.text}>
          <p className={styles.head}>{title}</p>
          <p className={styles.body}>{description}</p>
          <div className={styles.extra}>
            <div className={styles.category}>
              <p>Interested In</p>
              <span>{interest}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
