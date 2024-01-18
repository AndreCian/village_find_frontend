import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import clsx from 'clsx';

import { Container } from '@/components/layout/customer/Container';

import { CategoryContext } from '@/providers';

import styles from './Navbar.module.scss';

interface INavItem {
  title: string;
  path: string;
}

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const { isCategoryBar, toggleCategoryBar } = useContext(CategoryContext);

  const navItems: INavItem[] = [
    {
      title: 'Vendor Communities',
      path: '/communities',
    },
    {
      title: 'Subscriptions',
      path: '/communities',
    },
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'Sell',
      path: '/sell',
    },
  ];

  const onCatClick = () => {
    toggleCategoryBar();
  };

  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        <ul className={styles.navbar}>
          <li onClick={onCatClick}>
            Categories {isCategoryBar ? <FaChevronUp /> : <FaChevronDown />}
          </li>
          {navItems.map((navItem: INavItem) => (
            <li
              key={navItem.title}
              className={clsx(
                styles.navItem,
                pathname.startsWith(navItem.path),
              )}
              onClick={() => navigate(navItem.path)}
            >
              {navItem.title}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
