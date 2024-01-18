import { useState, useMemo } from 'react';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { TbListDetails } from 'react-icons/tb';

import { Input } from '@/components/forms';
import {
  VendorCard,
  ProductCard,
  FilterAndSortDialog,
  FindProductDialog,
  MobileSettingDialog,
} from '@/components/customer/common';

import { useWindowWidth } from '@/utils';

import styles from './CommunityContent.module.scss';

interface ICommunityContentProps {
  panel: boolean;
  title: string;
  subtitle: string;
}

const initialProducts = [
  {
    name: 'Gyuto Chef Knife',
    place: 'Forge2Table Knives',
    price: 10.93,
    image: '/assets/customer/products/product1.png',
  },
  {
    name: 'Mystery Awesome Box',
    place: 'Bills Boowls',
    price: 80.0,
    totprice: 160.0,
    image: '/assets/customer/products/product10.png',
    tags: ['Subscription'],
  },
  {
    name: 'Mystery Awesome Box',
    place: 'ToothyFoot',
    price: 4.89,
    image: '/assets/customer/products/product3.png',
    tags: ['Near You'],
  },
  {
    name: 'Mystery Awesome Box',
    place: 'Soaps & More',
    price: 22.98,
    image: '/assets/customer/products/product5.png',
    tags: ['Near You'],
  },
  {
    name: 'Gyuto Chef Knife',
    place: 'Forge2Table Knives',
    price: 10.93,
    image: '/assets/customer/products/product8.png',
  },
  {
    name: 'Mystery Awesome Box',
    place: 'Bills Boowls',
    price: 80.0,
    totprice: 160.0,
    image: '/assets/customer/products/product9.png',
  },
];

const initialVendors = [
  {
    vendorId: 'vendor1',
    backImage: '/assets/customer/vcom/vendor1.png',
    logoImage: '/assets/customer/vcom/vendorLogo1.png',
    title: "Bill's Birds",
    description: 'Over 600 artisans making unique one-of-a-kind items.',
    interest: 'Jewelry',
  },
];

export function CommunityContent({
  panel = true,
  title = '',
  subtitle = '',
}: ICommunityContentProps) {
  const minBreakLists = ['none', 'xs'];

  const [zipcode, setZipcode] = useState('');
  const [findProductOpen, showFindProductDialog] = useState(false);
  const [filterSortOpen, showFilterSortDialog] = useState(false);
  const [mobileSettingOpen, showMobileSettingDialog] = useState(false);

  const [_, breakpoint] = useWindowWidth();
  const isMobile = useMemo(() => {
    return minBreakLists.includes(breakpoint as string);
  }, [breakpoint]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p>{title}</p>
          <span>{subtitle}</span>
        </div>
        <div className={styles.settings}>
          <p>Find items near you!</p>
          <Input
            borderColor="success"
            placeholder="Enter Zipcode"
            adornment={{
              position: 'right',
              content: <FaMagnifyingGlass fill="#3F3F3F" />,
            }}
            className={styles.zipcode}
            value={zipcode}
            onClick={() => showFindProductDialog(true)}
          />
          <div
            className={styles.filter}
            onClick={() => showFilterSortDialog(true)}
          >
            <p>Filter and sort</p>
            <span>
              <TbListDetails />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.mobileHeader}>
        <div className={styles.filter}>
          <Input
            rounded="full"
            border="solid"
            borderColor="primary"
            placeholder="Search For item or Vendor"
            adornment={{
              position: 'right',
              content: <FaMagnifyingGlass fill="white" />,
            }}
            className={styles.search}
          />
          <div
            className={styles.filterIcon}
            onClick={() => showMobileSettingDialog(true)}
          >
            <div className={styles.container}>
              {Array(9)
                .fill(0)
                .map((_: any, index: number) => (
                  <span
                    key={`filter-icon-span-${index}`}
                    className={styles.iconGrid}
                  />
                ))}
            </div>
          </div>
        </div>
        <p>All Categories</p>
      </div>
      {panel ? (
        <div className={styles.products}>
          {initialProducts.map((product: any, index: number) => (
            <ProductCard
              key={`product-${index}`}
              product={product}
              isActive={isMobile}
            />
          ))}
        </div>
      ) : (
        <div className={styles.vendors}>
          {initialVendors.map((vendor: any, index: number) => (
            <VendorCard key={`vendor-${index}`} {...vendor} />
          ))}
        </div>
      )}
      <FindProductDialog
        open={findProductOpen}
        onClose={() => showFindProductDialog(false)}
      />
      <FilterAndSortDialog
        open={filterSortOpen}
        onClose={() => showFilterSortDialog(false)}
      />
      <MobileSettingDialog
        open={isMobile && mobileSettingOpen}
        onClose={() => showMobileSettingDialog(false)}
      />
    </div>
  );
}
