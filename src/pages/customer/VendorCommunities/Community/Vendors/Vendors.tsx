import { useContext, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

import { Container } from '@/components/layout/customer';
import { Pagination } from '@/components/common/Pagination';
import { CalendarIcon } from '@/components/icons';
import {
  CategoryBar,
  CommunityContent,
} from '@/components/customer/VendorCommunities';
import { EventMeetupDialog } from '@/components/customer/common';

import { HttpService } from '@/services';

import { AuthContext } from '@/providers';

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

interface IVendorsProps {
  announcement: {
    text: string;
    updated_at: string;
  };
  vendors: {
    name: string;
  }[];
  events: {
    fulfillment?: {
      date: string;
    };
  }[];
}

export function Vendors({ announcement, vendors, events }: IVendorsProps) {
  const { account } = useContext(AuthContext);

  const [panelType, setPanelType] = useState(true);
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState<
    { name: string; value: string }[]
  >([]);
  const currentCategory = useMemo(() => {
    const current = categoryList.find(item => item.value === category);
    return !current ? '' : current.name;
  }, []);

  const [vendor, setVendor] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMeetupOpen, setIsMeetupOpen] = useState(false);

  const [attendees, setAttendees] = useState<string[]>([]);

  const formatDate = (date: string) => {
    return !date
      ? ''
      : new Date(date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
  };

  const onCategoryChange = (value: string) => {
    setCategory(value);
    setPanelType(true);
  };

  const onVendorChange = (index: number) => {
    setVendor(index);
    setPanelType(false);
  };

  const onReadToggle = () => {
    setIsMoreOpen(!isMoreOpen);
  };

  useEffect(() => {
    HttpService.get('/settings/general/category').then((response: any) => {
      const categories = [
        { name: 'All Categories', value: 'all' },
        ...(response ?? []),
      ].map((item: any) => ({
        ...item,
        value: item.value ?? item.name.toLowerCase(),
      }));
      setCategoryList(categories);
    });
  }, []);

  useEffect(() => {
    if (!(account && account.profile && account.profile._id)) return;
    HttpService.get('/communities/meetup', {
      customerId: account.profile._id,
    }).then(response => {
      const { status, attendees } = response;
      if (status === 200) {
        setAttendees((attendees ?? []).map((item: any) => item.event ?? ''));
      }
    });
  }, []);

  return (
    <>
      <Container className={styles.root}>
        <div className={styles.dashImage}>
          <img src="/assets/customer/vcom/individual.png" />
        </div>
        <div className={styles.vendors}>
          <p>
            Vendors <span>{vendors.length}</span>
          </p>
        </div>
        <div className={styles.schedule}>
          <div className={styles.announcement}>
            <div className={styles.container}>
              <div className={styles.title}>
                <p>Announcement</p>
                <span>Last Updated {formatDate(announcement.updated_at)}</span>
              </div>
              <div className={styles.content}>
                <p className={clsx({ [styles.collapsed]: !isMoreOpen })}>
                  {announcement.text}
                </p>
                <span onClick={onReadToggle}>
                  Read {isMoreOpen ? 'Less' : 'More'}
                </span>
              </div>
            </div>
          </div>
          <button
            className={styles.eventsButton}
            onClick={() => setIsMeetupOpen(true)}
          >
            <p>Events</p>
            <CalendarIcon />
          </button>
        </div>
        <div className={styles.section}>
          <CategoryBar
            panel={panelType}
            category={category}
            changeCategory={onCategoryChange}
            vendor={vendor}
            changeVendor={onVendorChange}
            categories={categoryList}
          />
          <CommunityContent
            panel={panelType}
            title={panelType ? 'Products' : 'Vendors'}
            subtitle={panelType ? currentCategory : initialVendors[vendor]}
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
      <EventMeetupDialog
        open={isMeetupOpen}
        onClose={() => setIsMeetupOpen(false)}
        events={events}
        attendees={attendees}
      />
    </>
  );
}
