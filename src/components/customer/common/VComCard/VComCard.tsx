import { useNavigate } from 'react-router-dom';

import styles from './VComCard.module.scss';

interface IVComCardProps {
  vcomId: string;
  backImage: string;
  logoImage: string;
  title: string;
  description: string;
  category: string;
  vendors: number;
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
      <img src={backImage} />
      <div className={styles.community}>
        <div className={styles.image}>
          <img
            src={logoImage}
            onClick={() => navigate(`/communities/${vcomId}/vendors`)}
          />
        </div>
        <div className={styles.text}>
          <p
            className={styles.head}
            onClick={() => navigate(`/communities/${vcomId}/vendors`)}
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
              <span>{vendors}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
