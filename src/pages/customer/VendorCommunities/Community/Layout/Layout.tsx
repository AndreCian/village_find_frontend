import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Container } from '@/components/layout/customer';
import { Button, Select } from '@/components/forms';

import { HttpService } from '@/services';

import styles from './Layout.module.scss';

const initialVendor = {
  image: '/assets/customer/backs/shopvcom.png',
  title: 'Field Of Artisans',
  description:
    'Fresh food at an affordable price for the family and for the friends in life you have.',
};

const initialNavItems = ['Vendors', 'About', 'Join Our Community'];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: vendorId } = useParams();

  const pathname = location.pathname;

  const [community, setCommunity] = useState<any>({});

  const initialPath = `'/communities/${vendorId}`;

  const onNavItemClick = (item: string) => {
    navigate(`${initialPath}/${item.toLowerCase()}`);
  };

  const onJoinClick = () => {
    if (!community.code) return;
    navigate(`/sign-up/vendor?community=${community.code}`);
  };

  useEffect(() => {
    if (!vendorId) return;
    HttpService.get(`/communities/${vendorId}`).then(response => {
      setCommunity(response || {});
    });
  }, [vendorId]);

  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        <Select
          rounded="full"
          border="none"
          options={initialNavItems}
          bgcolor="primary"
          value={
            initialNavItems.find(item =>
              pathname.endsWith(item.toLowerCase()),
            ) || ''
          }
          updateValue={onNavItemClick}
          className={styles.navItems}
        />
        <div className={styles.header}>
          <div className={styles.vendor}>
            <div className={styles.image}>
              <img src={community.image || initialVendor.image} />
            </div>
            <div className={styles.text}>
              <p className={styles.title}>{community.villageName || ''}</p>
              <p className={styles.body}>{community.description || ''}</p>
            </div>
          </div>
          <div className={styles.links}>
            {initialNavItems.slice(0, 2).map((link: string, index: number) => (
              <p
                key={`link-${index}`}
                className={
                  pathname.endsWith(link.toLowerCase()) ? styles.active : ''
                }
                onClick={() => navigate(`${initialPath}/${link.toLowerCase()}`)}
              >
                {link}
              </p>
            ))}
            <Button className={styles.joinButton} onClick={onJoinClick}>
              Join Our Community
            </Button>
          </div>
        </div>
      </Container>
      <Outlet />
    </div>
  );
}
