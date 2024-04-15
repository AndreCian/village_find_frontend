import { useContext, useEffect, useState, MouseEvent } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import {
  FaMagnifyingGlass,
  FaBars,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa6';
import { AiOutlineClose } from 'react-icons/ai';
import clsx from 'clsx';

import { Button, Input } from '@/components/forms';
import { MagnifierIcon, CartIcon, UserIcon } from '@/components/icons';
import { Logo } from '@/components/layout/customer';

import { AuthContext, SearchbarContext, ZipcodeContext } from '@/providers';

import { useWindowWidth } from '@/utils/hook/useWindowWidth';

import styles from './Header.module.scss';
import { ChangeInputEvent } from '@/interfaces';
import { HttpService } from '@/services';

export interface IHeaderProps {
  switchToScreen: (isScreen: boolean) => void;
  className?: string;
}

export function Header({
  className = '',
  switchToScreen = () => {},
}: IHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();

  // const shopLoc: string = 'Waterbury';
  // const shopZipcode: string = '06705';

  const { isLogin, account } = useContext(AuthContext);
  const { isSearchbar } = useContext(SearchbarContext);
  const { zipcode, cityName, changeZipcode } = useContext(ZipcodeContext);

  const [shopLocAnchor, setShopLocAnchor] = useState(-1);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [collapseAnchor, setCollapseAnchor] = useState(false);
  const [categoryAnchor, setCategoryAnchor] = useState(true);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    [],
  );
  const [search, setSearch] = useState('');
  const [zipcodeInput, setZipcodeInput] = useState('');
  const [_, breakpoint] = useWindowWidth();

  const onShopSelect = (e: MouseEvent) => {
    if (shopLocAnchor === -1) {
      setShopLocAnchor(e.clientX);
    } else {
      setShopLocAnchor(-1);
    }
  };

  const onShopClose = () => {
    setShopLocAnchor(-1);
  };

  const onCollapseClick = () => {
    switchToScreen(!collapseAnchor);
    setCollapseAnchor(!collapseAnchor);
  };

  const onCategoryClick = () => {
    setCategoryAnchor(!categoryAnchor);
  };

  const onLoginClick = () => {
    setCollapseAnchor(false);
    switchToScreen(false);
    navigate('/login/customer');
  };

  const onSignupClick = () => {
    setCollapseAnchor(false);
    switchToScreen(false);
    navigate('/sign-up/customer');
  };

  const onProfileClick = () => {
    setCollapseAnchor(false);
    switchToScreen(false);
    navigate('/profile');
  };

  const onZipcodeInputKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      changeZipcode(zipcodeInput);
    }
  };

  const onSearchKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      if (pathname === '/market') {
        searchParams.set('search', search);
        setSearchParams(searchParams);
      } else {
        navigate(`/market?search=${search}`);
      }
    }
  };

  useEffect(() => {
    if (['sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(breakpoint as string)) {
      setCollapseAnchor(false);
    }
  }, [breakpoint]);

  useEffect(() => {
    HttpService.get('/cart/count').then(response => {
      const { status, count } = response;
      if (status === 200) {
        setCartItemCount(count);
      }
    });
    HttpService.get('/settings/general/category').then(response => {
      setCategories(response);
    });
  }, []);

  return (
    <div
      className={clsx(
        styles.root,
        collapseAnchor ? styles.screen : '',
        className,
      )}
    >
      <div className={styles.header}>
        <Logo className={styles.logo} />
        <div className={styles.shopLoc} onClick={onShopSelect}>
          <p>You're shopping</p>
          {cityName && (
            <p className={styles.locSelect}>
              <span>{cityName}</span>
              {shopLocAnchor !== -1 ? <FaChevronUp /> : <FaChevronDown />}
            </p>
          )}
        </div>
        <div
          className={clsx(
            styles.searchBar,
            isSearchbar ? styles.hiddenSearchBar : '',
          )}
        >
          <Input
            size="large"
            rounded="full"
            border="solid"
            borderColor="success"
            placeholder="Search for vendors, food, artisan goods & more..."
            adornment={{
              position: 'right',
              content: <MagnifierIcon />,
            }}
            value={search}
            updateValue={(e: ChangeInputEvent) => setSearch(e.target.value)}
            onKeyDown={onSearchKeyDown}
          />
        </div>
        {isLogin ? (
          <>
            <div className={styles.account}>
              <p>Hi, {account?.profile && account.profile.firstName}</p>
              <UserIcon className={styles.icon} />
            </div>
            <div
              className={styles.navToCart}
              onClick={() => navigate('/checkout')}
            >
              <CartIcon className={styles.icon} />
              <div className={styles.badge}>
                <span>{cartItemCount}</span>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.buttonBar}>
            <Button variant="none" onClick={onLoginClick}>
              Login
            </Button>
            <Button onClick={onSignupClick}>Sign up</Button>
          </div>
        )}
        <div className={styles.collapseIcon} onClick={onCollapseClick}>
          {collapseAnchor ? (
            <AiOutlineClose fill="white" />
          ) : (
            <FaBars fill="white" />
          )}
        </div>
      </div>
      <div className={styles.collapsePanel}>
        {collapseAnchor && (
          <ul className={styles.subHeader}>
            {isLogin ? (
              <>
                <li className={styles.namebar}>
                  Hi, {account?.profile && account.profile.firstName}
                </li>
                <li className={styles.activeItem} onClick={onProfileClick}>
                  View Profile
                </li>
              </>
            ) : (
              <>
                <li onClick={onLoginClick}>Login</li>
                <li className={styles.activeItem} onClick={onSignupClick}>
                  Sign Up
                </li>
              </>
            )}
          </ul>
        )}
        {collapseAnchor && (
          <div className={styles.collapseHeader}>
            <Input
              rounded="full"
              adornment={{
                position: 'right',
                content: <FaMagnifyingGlass fill="white" />,
              }}
              placeholder="Search for vendors, food, artisan goods & more..."
              size="large"
              borderColor="primary"
              className={styles.searchInput}
            />
            <div className={styles.navbar}>
              <div className={styles.categories}>
                <p className={styles.catNavItem} onClick={onCategoryClick}>
                  All Categories{' '}
                  {categoryAnchor ? <FaChevronUp /> : <FaChevronDown />}
                </p>
                {categoryAnchor && (
                  <ul>
                    {categories.map((category: any, index: number) => (
                      <li key={`${category}-${index}`}>{category.name}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.divider} />
              <ul>
                <li>Vendor Communities</li>
                <li>Subscriptions</li>
                <li>About</li>
              </ul>
            </div>
            <Button color="light" className={styles.sellButton}>
              Sell
            </Button>
          </div>
        )}
        {shopLocAnchor !== -1 && (
          <div
            className={styles.shopCollapse}
            style={
              shopLocAnchor !== -1 &&
              ['sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(
                breakpoint as string,
              )
                ? { left: `${shopLocAnchor}px` }
                : {}
            }
          >
            <span className={styles.closeIcon} onClick={onShopClose}>
              <AiOutlineClose />
            </span>
            {cityName && (
              <div className={styles.shopInfo}>
                <span>{cityName}</span>
                {zipcode}
              </div>
            )}
            <p>
              Enter your zipcode to see items from vendors in your area. There's
              more to explore!
            </p>
            <Input
              rounded="full"
              adornment={{
                position: 'right',
                content: <FaMagnifyingGlass fill="white" />,
              }}
              placeholder="Enter Zip Code"
              size="large"
              borderColor="primary"
              className={styles.searchInput}
              value={zipcodeInput}
              updateValue={(e: ChangeInputEvent) =>
                setZipcodeInput(e.target.value)
              }
              onKeyDown={onZipcodeInputKeydown}
            />
          </div>
        )}
      </div>
    </div>
  );
}
