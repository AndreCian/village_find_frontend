import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import { Card } from '@/components/common';

import { useOnClickOutside } from '@/utils';

import styles from './Dropdown.module.scss';

export function Dropdown() {
  const [anchor, setAnchor] = useState(false);
  const dropRef = useRef(null);

  const username = 'Brandon Monti';

  useOnClickOutside(dropRef, () => setAnchor(false));

  return (
    <div className={styles.root} ref={dropRef}>
      <div className={styles.dropdown}>
        <p onClick={() => setAnchor(!anchor)}>{username}</p>
        <span className={styles.arrow} onClick={() => setAnchor(!anchor)}>
          {anchor ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {anchor && (
        <Card className={styles.dropbox}>
          <Link to={'/admin/my-store'}>My Store</Link>
          <Link to={'/admin/logout'}>Logout</Link>
        </Card>
      )}
    </div>
  );
}
