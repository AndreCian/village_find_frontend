import { useState } from 'react';
import { FaStar, FaRegStar, FaRegStarHalfStroke } from 'react-icons/fa6';

import styles from './Rater.module.scss';

interface IRaterProps {
  iconValue?: number;
  iconSize?: number;
  rating: number;
}

export const Rater = ({
  iconValue = 5,
  iconSize = 20,
  rating,
}: IRaterProps) => {
  return (
    <div className={styles.root}>
      {[...Array(iconValue + 1).keys()]
        .slice(1)
        .map(value =>
          value === rating + 0.5 ? (
            <FaRegStarHalfStroke
              key={value}
              size={iconSize + 4}
              fill="#652F90"
            />
          ) : value <= rating ? (
            <FaStar key={value} size={iconSize} fill="#652F90" />
          ) : (
            <FaRegStar key={value} size={iconSize} fill="#652F90" />
          ),
        )}
    </div>
  );
};

export default Rater;
