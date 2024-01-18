import { useState, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import {
  Topbar,
  Header,
  Navbar,
  Footer,
  Container,
} from '@/components/layout/customer';
import { Categories } from '@/components/customer/Market';

import { CategoryContext, SearchbarContext } from '@/providers';

import { useWindowWidth } from '@/utils';

export function Layout() {
  const location = useLocation();
  const pathname = location.pathname;

  const { isCategoryBar } = useContext(CategoryContext);
  const { showSearchbar } = useContext(SearchbarContext);

  const [isScreen, setIsScreen] = useState(false);

  const [_, breakpoint] = useWindowWidth();

  const screenBlackLists = ['/login/customer', '/login/vendor'];
  const smallBPLists = ['none', 'xs'];

  const onWindowScroll = () => {
    if (window.scrollY < 200 && pathname.startsWith('/dashboard')) {
      showSearchbar(true);
    } else {
      showSearchbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll);

    return () => {
      window.removeEventListener('scroll', onWindowScroll);
    };
  }, []);

  return (
    <div
      className={
        isScreen || screenBlackLists.includes(pathname) ? 'h-screen' : ''
      }
    >
      <div
        className={clsx(
          'h-full',
          smallBPLists.includes(breakpoint as string) ? 'pt-[120px]' : 'pt-40',
        )}
      >
        <div
          className={clsx(
            'fixed top-0 z-50 w-full',
            isScreen ? 'flex h-full flex-col' : '',
          )}
        >
          <Topbar />
          <Header switchToScreen={setIsScreen} />
          <Navbar />
        </div>
        {isCategoryBar && (
          <Container className="sticky top-40">
            <Categories />
          </Container>
        )}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
