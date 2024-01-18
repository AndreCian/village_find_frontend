import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@/components/layout/customer';
import { Pagination } from '@/components/common/Pagination';
import {
  CategoryBar,
  CommunityContent,
} from '@/components/customer/VendorCommunities';

import { HttpService } from '@/services';

import styles from './Vendors.module.scss';

const initialVendors = [
  'All Vendors',
  'Bills Birds',
  'The Foundry',
  'Walk with Purpose Hats',
  "Lilly's Jewels",
  'Pat Backs',
  "Bronson's Purpose",
  "Greg's Eggs",
  'Juan and Kan',
];

export function Vendors() {
  const { id: vendorId } = useParams();
  const [panelType, setPanelType] = useState(true);
  const [category, setCategory] = useState(-1);
  const [vendor, setVendor] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [categories, setCategories] = useState([]);
  const [community, setCommunity] = useState<any>({});

  const onCategoryChange = (index: number) => {
    setCategory(index);
    setPanelType(true);
  };

  const onVendorChange = (index: number) => {
    setVendor(index);
    setPanelType(false);
  };

  useEffect(() => {
    if (!vendorId) return;
    HttpService.get(`/communities/${vendorId}`).then(response => {
      const result = response || {};
      setCommunity(result);
    });
    HttpService.get('/settings/general/category').then((response: any) => {
      const result = response || [];
      setCategories(result.map((item: any) => item.name || ''));
    });
  }, [vendorId]);

  return (
    <Container className={styles.root}>
      <div className={styles.dashImage}>
        <img src="/assets/customer/vcom/individual.png" />
      </div>
      <div className={styles.vendors}>
        <p>
          Vendors <span>{community.total || 0}</span>
        </p>
      </div>
      <div className={styles.announcement}>
        <div className={styles.container}>
          <div className={styles.title}>
            <p>Announcement</p>
            <span>Last Updated Mar 30, 2022</span>
          </div>
          <div className={styles.content}>
            <p>
              COVID 19 UPDATE : We are currently accepting orders as usual and
              shipping them within given time frames, but please NOTE that due
              to the current global situation deliveries are being delayed if
              shipped by either Fedex and National post services. Stay SAFE!
              IMPORTANT NOTICE: Due to many orders our current production time
              is 4-5 weeks. Thank you all for giving us time to do our work 4-5
              weeks. Thank you all for giving us time to do our work 4-5 weeks.
              Thank you all
            </p>
            <span>Read More</span>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <CategoryBar
          panel={panelType}
          category={category}
          changeCategory={onCategoryChange}
          vendor={vendor}
          changeVendor={onVendorChange}
          categories={categories}
        />
        <CommunityContent
          panel={panelType}
          title={panelType ? 'Products' : 'Vendors'}
          subtitle={panelType ? categories[category] : initialVendors[vendor]}
        />
      </div>
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          navigate={setCurrentPage}
        />
      </div>
    </Container>
  );
}
