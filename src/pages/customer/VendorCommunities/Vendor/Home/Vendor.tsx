import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';

import { Container } from '@/components/layout/customer';
import { CategoryBar } from '@/components/customer/VendorCommunities';
import { CommunityContent } from '@/components/customer/VendorCommunities';
import { Pagination } from '@/components';
import { SERVER_URL } from '@/config/global';
import { HttpService } from '@/services';
import { formatDate } from '@/utils';

import BackImage from '/assets/customer/vcom/individual.png';
import styles from './Vendor.module.scss';

interface IVendor {
  logoUrl: string;
  slides: string[];
  shopName: string;
  shortDesc: string;
}

interface ICommunity {
  logoUrl: string;
  slug: string;
  name: string;
  announcement?: {
    text: string;
    updated_at: string;
  };
}

const initialVendor: IVendor = {
  logoUrl: '',
  slides: [],
  shopName: '',
  shortDesc: '',
};

const initialCommunity: ICommunity = {
  logoUrl: '',
  slug: '',
  name: '',
};

export function Vendor() {
  const navigate = useNavigate();
  const { id: vendorID } = useParams();

  const [vendor, setVendor] = useState<IVendor>(initialVendor);
  const [community, setCommunity] = useState<ICommunity>(initialCommunity);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState<
    { name: string; value: string }[]
  >([]);
  const currentCategory = useMemo(() => {
    const current = categoryList.find(item => item.value === category);
    return !current ? '' : current.name;
  }, []);
  const [products, setProducts] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const onCategoryChange = (value: string) => {
    setCategory(value);
  };

  const onAboutClick = () => {
    navigate('about');
  };

  useEffect(() => {
    HttpService.get('/user/vendor', { vendorId: vendorID }).then(response => {
      const { status, vendor } = response;
      if (status === 200 && vendor) {
        const { shopName, store, images, community } = vendor;
        setVendor({
          shopName,
          shortDesc: store.shortDesc,
          logoUrl: images.logoUrl,
          slides: images.slides,
        });
        setCommunity({
          logoUrl: (community.images && community.images.logoUrl) || '',
          slug: community.slug,
          name: community.name,
          announcement: community.announcement,
        });
      }
    });
    HttpService.get('/products/public', { vendor: vendorID }).then(response => {
      setProducts(response || []);
    });
  }, [vendorID]);

  return (
    <Container>
      <div className={styles.root}>
        <img
          src={
            vendor.slides && vendor.slides.length > 0
              ? `${SERVER_URL}/${vendor.slides[0]}`
              : BackImage
          }
          alt="Vendor slides"
          className={styles.slides}
        />
        <div className={styles.info}>
          <div className={styles.vendor}>
            <img src={`${SERVER_URL}/${vendor.logoUrl}`} alt="Vendor logo" />
            <div>
              <p className={styles.name}>{vendor.shopName}</p>
              <p className={styles.desc}>{vendor.shortDesc}</p>
              <button onClick={onAboutClick}>About</button>
            </div>
          </div>
          <div className={styles.community}>
            <p>Vendor Community</p>
            <div>
              <p onClick={() => navigate(`/communities/${community.slug}`)}>
                {community.name}
              </p>
              <img
                src={`${SERVER_URL}/${community.logoUrl}`}
                alt="Community logo"
              />
            </div>
          </div>
        </div>
        <div className={styles.announcement}>
          <div className={styles.container}>
            <div className={styles.title}>
              <p>Announcement</p>
              <span>
                Last Updated{' '}
                {formatDate(community.announcement?.updated_at || '')}
              </span>
            </div>
            <div className={styles.content}>
              <p className={clsx({ [styles.collapsed]: !isMoreOpen })}>
                {community.announcement?.text || ''}
              </p>
              <span onClick={() => setIsMoreOpen(!isMoreOpen)}>
                Read {isMoreOpen ? 'Less' : 'More'}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <CategoryBar
            isVendorPanel={false}
            panel={true}
            category={category}
            changeCategory={onCategoryChange}
            vendor={-1}
            changeVendor={() => {}}
            categories={categoryList}
          />
          <CommunityContent
            panel={true}
            title={'Products'}
            subtitle={currentCategory}
            products={products}
            vendors={[]}
          />
        </div>
        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            navigate={setCurrentPage}
          />
        </div>
      </div>
    </Container>
  );
}
