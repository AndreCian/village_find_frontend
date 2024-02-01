import { useNavigate } from 'react-router-dom';

import { SERVER_URL } from '@/config/global';

import styles from './VComCard.module.scss';

interface IVComCardProps {
  vcomId: string;
  backImage: string;
  logoImage: string;
  title: string;
  description: string;
  category: string;
  vendors: { _id: string }[];
}

export function VComCard({
  vcomId,
  backImage,
  logoImage,
  title,
  description,
  category,
  vendors,
}: IVComCardProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <img
        alt="Community background image"
        src={`${SERVER_URL}/${backImage}`}
      />
      <div className={styles.community}>
        <div className={styles.image}>
          <img
            alt="Community logo image"
            src={`${SERVER_URL}/${logoImage}`}
            onClick={() => navigate(`/communities/${vcomId}`)}
          />
        </div>
        <div className={styles.text}>
          <p
            className={styles.head}
            onClick={() => navigate(`/communities/${vcomId}`)}
          >
            {title}
          </p>
          <p className={styles.body}>{description}</p>
          <div className={styles.extra}>
            <div className={styles.category}>
              <p>Category</p>
              <span>{category}</span>
            </div>
            <div className={styles.vendor}>
              <p>Vendors</p>
              <span>{vendors.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
