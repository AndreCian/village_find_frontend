import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

import { Button, Input, Radio, RadioGroup } from '@/components/forms';

import { HttpService } from '@/services';

import styles from './VendorSignup.module.scss';

const initialRoles = [
  'SEO & Marketing',
  'Product Photography',
  'Writing product descriptions',
  'General business help',
];

interface IAccount {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
  zipcode: string;
}

const initialAccount = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirm: '',
  zipcode: '',
};

interface ISubscription {
  title: string;
  name: string;
  description: string;
  monthlyFee: number;
  discount: {
    origin: number;
    current: number;
  };
}

const initialSubscriptions: ISubscription[] = [
  {
    title: 'Seedling',
    name: 'seedling',
    description:
      'Enjoy a no-code online store with Shipping integrations and everything you need to sell online. Add up to 25 items for free.',
    monthlyFee: 0,
    discount: {
      origin: 10,
      current: 8.5,
    },
  },
  {
    title: 'Sprouting',
    name: 'sprouting',
    description:
      'Give your growing business take advantage of a no-code online store with Shipping integrations and everything you need to sell online. This subscription includes access to FC University and a lower transaction fee.',
    monthlyFee: 4.99,
    discount: {
      origin: 8.5,
      current: 6.5,
    },
  },
  {
    title: 'Budding',
    name: 'budding',
    description:
      'This subscription offers your budding business more than shipping. You can now provide flexible delivery, pickup, and shipping options with the ability to set order cut-off times and add pickup locations.',
    monthlyFee: 9.99,
    discount: {
      origin: 8.5,
      current: 6.5,
    },
  },
];

const formatMonthlyFee = (price: number) => {
  return price === 0 ? 'Free' : `$${price.toFixed(2)} a month`;
};

export function VendorSignup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(0);
  const [collapseId, setCollapseId] = useState(0);
  const [roleIndex, setRoleIndex] = useState('0');

  const [account, setAccount] = useState<IAccount>(initialAccount);
  const [subscription, setSubscription] = useState('seedling');
  const [codes, setCodes] = useState<string[]>(Array(5).fill(''));

  const codeRefs = [...Array(5)].map((_: any) =>
    useRef<HTMLInputElement>(null),
  );

  const onCodeSubmit = () => {
    setCollapseId(1);
  };

  const onWithoutCommunityClick = () => {
    setCollapseId(1);
  };

  const onLoginClick = (e: any) => {
    e.preventDefault();
    navigate('/login/vendor');
  };

  const onAccountChange = (e: any) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onCodeChange = (e: any, index: number) => {
    const value = e.key;
    if (value.length === 1) {
      index === 4
        ? codeRefs[0].current?.focus()
        : codeRefs[index + 1].current?.focus();
      setCodes(
        codes.map((code: string, _index: number) =>
          index === _index ? value : code,
        ),
      );
    }
  };

  const onSignupClick = () => {};

  useEffect(() => {
    if (
      !searchParams.get('community') ||
      (searchParams.get('community') as string).length !== 5
    )
      return;
    setCodes((searchParams.get('community') as string).split(''));
    setStep(1);
    setCollapseId(1);
  }, []);

  return (
    <div className={clsx(styles.root, { [styles.primary]: collapseId > 0 })}>
      {step === 0 ? (
        <div className={styles.dashboard}>
          <div className={styles.head}>
            <p className={styles.title}>
              It takes a community to build a successful company!
            </p>
            <p className={styles.text}>
              Share with us what kind of help your business may need! We provide
              education and or help in these areas.
            </p>
          </div>
          <div className={styles.body}>
            <RadioGroup
              className={styles.roleList}
              value={roleIndex}
              updateValue={(index: string) => setRoleIndex(index)}
            >
              {initialRoles.map((role: string, index: number) => (
                <div
                  key={index}
                  className={clsx(styles.role, {
                    [styles.active]: roleIndex === index.toString(),
                  })}
                  onClick={() => setRoleIndex(index.toString())}
                >
                  <Radio
                    label={role}
                    className={styles.radio}
                    value={index.toString()}
                  />
                </div>
              ))}
            </RadioGroup>
            <Button
              className={styles.nextBtn}
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.register}>
          <div className={styles.head}>
            <p
              className={clsx(styles.title, {
                [styles.without]: collapseId > 0,
              })}
            >
              {collapseId > 0
                ? 'Signup without vendor community'
                : 'Vendor Sign Up'}
            </p>
            {collapseId > 0 && (
              <div className={styles.image}>
                <img
                  src="/assets/customer/backs/vendor-signup.png"
                  alt="Primary background image"
                />
                <div className={styles.metaInfo}>
                  <img
                    src="/assets/customer/backs/shopvcom.png"
                    alt="Vendor community general logo"
                  />
                  <div className={styles.text}>
                    <p className={styles.title}>Field of Artisans</p>
                    <p>Vendor Community</p>
                  </div>
                </div>
                <div className={styles.grayLayer} />
              </div>
            )}
          </div>
          <div className={styles.body}>
            <div
              className={clsx(styles.communityCode, styles.section, {
                [styles.active]: collapseId === 0,
              })}
            >
              <div className={styles.text}>
                <p className={styles.title}>Vendor Community Code</p>
                {collapseId === 0 && (
                  <p className={styles.description}>
                    If you are affiliated with a vendor community, enter their
                    code below. If you are a part of a vendor community but
                    don't know your code, contact them to receive your code.
                  </p>
                )}
              </div>
              {collapseId === 0 && (
                <div className={styles.verifyBox}>
                  <div className={styles.inputBox}>
                    {[...Array(5)].map((item: number, index: number) => (
                      <Input
                        key={index}
                        className={styles.input}
                        ref={codeRefs[index]}
                        value={codes[index]}
                        onKeyDown={e => onCodeChange(e, index)}
                      />
                    ))}
                    <Button className={styles.submitBtn} onClick={onCodeSubmit}>
                      Submit
                    </Button>
                  </div>
                  <div className={styles.otherOption}>
                    <div className={styles.text}>
                      <p className={styles.orText}>OR</p>
                      <p className={styles.description}>
                        I am not affiliated with a community. It's just me and
                        that's how I like it!
                      </p>
                    </div>
                    <Button
                      className={styles.justmeBtn}
                      onClick={onWithoutCommunityClick}
                    >
                      It's Just Me
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div
              className={clsx(styles.accountDetail, styles.section, {
                [styles.active]: collapseId === 1,
              })}
            >
              <div className={styles.text}>
                <p className={styles.title}>Account Details</p>
              </div>
              {collapseId === 1 && (
                <div className={styles.details}>
                  <div className={styles.elements}>
                    <div className={styles.horizon}>
                      <Input
                        name="firstName"
                        value={account.firstName}
                        className={styles.input}
                        placeholder="First Name"
                        updateValue={onAccountChange}
                      />
                      <Input
                        name="lastName"
                        value={account.lastName}
                        className={styles.input}
                        placeholder="Last Name"
                        updateValue={onAccountChange}
                      />
                    </div>
                    <Input
                      name="phone"
                      value={account.phone}
                      className={styles.input}
                      placeholder="Phone #"
                      updateValue={onAccountChange}
                    />
                    <Input
                      name="email"
                      value={account.email}
                      className={styles.input}
                      placeholder="Email"
                      updateValue={onAccountChange}
                    />
                    <Input
                      name="password"
                      value={account.password}
                      className={styles.input}
                      placeholder="Password"
                      updateValue={onAccountChange}
                    />
                    <Input
                      name="confirm"
                      value={account.confirm}
                      className={styles.input}
                      placeholder="Confirm Password"
                      updateValue={onAccountChange}
                    />
                    <Input
                      name="zipcode"
                      value={account.zipcode}
                      className={styles.input}
                      placeholder="5 digit Zip Code"
                      updateValue={onAccountChange}
                    />
                  </div>
                  <div className={styles.bottom}>
                    <Button
                      className={styles.nextBtn}
                      onClick={() => setCollapseId(collapseId + 1)}
                    >
                      Next Step
                    </Button>
                    <div className={styles.contactInfo}>
                      <p>
                        Already have an account?{' '}
                        <a
                          className={styles.login}
                          href="/login/vendor"
                          onClick={onLoginClick}
                        >
                          Log In
                        </a>
                      </p>
                      <p>
                        Want to talk to a human first?{' '}
                        <span className={styles.phone}>(203) 228-8814</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={clsx(styles.subscription, styles.section, {
                [styles.active]: collapseId === 2,
              })}
            >
              <div className={styles.text}>
                <p className={styles.title}>Select Subscription</p>
              </div>
              {collapseId === 2 && (
                <div className={styles.content}>
                  <RadioGroup
                    color="secondary"
                    value={subscription}
                    updateValue={(value: string) => setSubscription(value)}
                    className={styles.variants}
                  >
                    {initialSubscriptions.map(
                      (subscription: ISubscription, index: number) => (
                        <div key={index} className={styles.variant}>
                          <Radio
                            value={subscription.name}
                            className={styles.checkbox}
                          />
                          <div className={styles.text}>
                            <p className={styles.title}>{subscription.title}</p>
                            <p className={styles.description}>
                              {subscription.description}
                            </p>
                            <p className={styles.transaction}>
                              <span className={styles.monthFee}>
                                {formatMonthlyFee(subscription.monthlyFee)}
                              </span>{' '}
                              +{' '}
                              <span className={styles.origin}>
                                {subscription.discount.origin}%
                              </span>{' '}
                              <span className={styles.current}>
                                now {subscription.discount.current}%
                              </span>{' '}
                              transaction fee
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </RadioGroup>
                  <Button
                    className={styles.nextBtn}
                    onClick={() => setCollapseId(collapseId + 2)}
                  >
                    Next Step
                  </Button>
                </div>
              )}
            </div>
            <div
              className={clsx(styles.agreement, styles.section, {
                [styles.active]: collapseId === 3,
              })}
            >
              <div className={styles.text}>
                <p className={styles.title}>Agreement</p>
              </div>
            </div>
            <div
              className={clsx(styles.billing, styles.section, {
                [styles.active]: collapseId === 4,
              })}
            >
              <div className={styles.text}>
                <p className={styles.title}>Bill Information</p>
              </div>
              {collapseId === 4 && (
                <div className={styles.content}>
                  <p className={styles.description}>
                    Connect your account with the worlds leading payments
                    gateway by clicking the link below. it's safe and secured by
                    Stripe.
                  </p>
                  <div className={styles.stripe}>
                    <Button className={styles.connectBtn}>
                      Connect with stripe
                    </Button>
                    <img src="/assets/customer/logos/stripe.png" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
