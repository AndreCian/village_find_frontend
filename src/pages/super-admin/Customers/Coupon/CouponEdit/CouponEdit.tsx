import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { Card, TableBody } from '@/components/common';
import { Input, Select, RadioGroup, Radio } from '@/components/forms';
import { MagnifierIcon } from '@/components/icons';

import { CouponService } from '@/services';

import { IRange, ITableColumn } from '@/interfaces';

import { getBubbleObject } from '@/utils/data/getBubbleObject';

import ProductSvg from '/assets/admin/backs/product.svg';
import styles from './CouponEdit.module.scss';

export type CouponType = 'Free Shipping' | 'Percent' | 'Tiered';
export type UsageType = 'Use Code' | 'Amount Spent';
export type TargetType =
  | 'Global Coupon'
  | 'Product Specific'
  | 'Customer Specific';

interface ICondition {
  discount: number;
  minimum?: number;
  maximum?: number;
}

export interface IEditingCoupon {
  type: CouponType;
  date: IRange;
  usage?: {
    type: UsageType;
    code?: string;
    amount?: number;
  };
  code?: string;
  discount?: number;
  conditions?: ICondition[];
  target: {
    type: TargetType;
    id?: string;
  };
}

const couponTypes: string[] = ['Free Shipping', 'Percent', 'Tiered'];

const customerColumns: ITableColumn[] = [
  {
    title: 'Select',
    name: 'select',
    width: 100,
    cell: (row: any) => <Radio value={row.id} />,
  },
  {
    title: 'Customer Name',
    name: 'name',
    width: 200,
  },
  {
    title: 'Email',
    name: 'email',
    width: 250,
  },
];

const productColumns: ITableColumn[] = [
  {
    title: 'Select',
    name: 'select',
    width: 100,
    cell: (row: any) => (
      <Radio label={<img src={ProductSvg} />} value={row.id} />
    ),
  },
  {
    title: 'Product Name',
    name: 'name',
    width: 200,
  },
  {
    title: 'Original Price',
    name: 'oprice',
    width: 150,
    cell: (row: any) => <span>${row.oprice}</span>,
  },
  {
    title: 'Discount',
    name: 'discount',
    width: 100,
    cell: (row: any) => <span>{row.discount ? `$${row.discount}%` : ''}</span>,
  },
  {
    title: 'Discounted Price',
    name: 'dprice',
    width: 200,
    cell: (row: any) => <span>${row.dprice}</span>,
  },
];

const initialCustomers: any[] = [
  {
    id: 1,
    name: 'Jenny Boom',
    email: 'brandon@gmail.com',
  },
  {
    id: 2,
    name: 'Will Smith',
    email: 'brandon@gmail.com',
  },
  {
    id: 3,
    name: 'William Defo',
    email: 'brandon@gmail.com',
  },
];

const initialProducts: any[] = [
  {
    id: 1,
    name: 'Black Polish Radish',
    oprice: 10,
    discount: 10,
    dprice: 9,
  },
  {
    id: 2,
    name: 'Black Polish Radish',
    oprice: 10,
    discount: 10,
    dprice: 9,
  },
  {
    id: 3,
    name: 'Black Polish Radish',
    oprice: 10,
    discount: 10,
    dprice: 9,
  },
];

const initialCoupon: IEditingCoupon = {
  type: 'Free Shipping',
  date: {
    from: '',
    to: '',
  },
  usage: {
    type: 'Use Code',
    code: '',
  },
  code: '',
  discount: 0,
  conditions: [],
  target: {
    type: 'Global Coupon',
  },
};

const homePath = '/admin/customers/coupon';

export function CouponEdit() {
  const { id: couponId } = useParams();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState<IEditingCoupon>(initialCoupon);

  const updateStrForm = (field: string) => (value: string) => {
    setCoupon(getBubbleObject(field, coupon, value));
  };

  const updateInputForm = (field: string) => (e: any) => {
    setCoupon(getBubbleObject(field, coupon, e.target.value));
  };

  const updateCondition = (field: string, index: number) => (e: any) => {
    setCoupon({
      ...coupon,
      conditions: coupon.conditions?.map((_condition: any, _index: number) =>
        _index === index
          ? { ..._condition, [field]: e.target.value }
          : _condition,
      ),
    });
  };

  const onConditionAddClick = () => {
    setCoupon({
      ...coupon,
      conditions: [...(coupon.conditions as ICondition[]), { discount: 0 }],
    });
  };

  const onAddBtnClick = () => {
    let couponJson: IEditingCoupon = {
      type: coupon.type,
      date: coupon.date,
      code: coupon.code,
      target: { type: coupon.target.type },
    };
    if (coupon.target.type !== 'Global Coupon') {
      couponJson.target.id = coupon.target.id;
    }

    if (coupon.type === 'Free Shipping') {
      couponJson = { ...couponJson, usage: coupon.usage };
    } else if (coupon.type === 'Percent') {
      couponJson = { ...coupon, discount: coupon.discount };
    } else {
      couponJson = { ...coupon, conditions: coupon.conditions };
    }

    CouponService.createOne(couponJson)
      .then(response => {
        const { status } = response;
        if (status === 200) {
          setCoupon(initialCoupon);
          navigate(homePath);
          enqueueSnackbar(`${coupon.code} added successfully!`, {
            variant: 'success',
          });
        }
      })
      .catch(err => {
        enqueueSnackbar('Something went wrong with server.', {
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    if (!couponId || couponId === 'create') return;
    CouponService.findOne(couponId).then(response => {
      const { status, coupon } = response;
      if (status === 200) setCoupon(coupon);
    });
  }, [couponId]);

  return (
    <Card title="Coupon Center" className={styles.root}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.control}>
            <p>Coupon Type</p>
            <Select
              placeholder="Coupon Type"
              options={couponTypes}
              value={coupon.type}
              updateValue={updateStrForm('type')}
              className={styles.typeSelector}
            />
          </div>
          {coupon.type === 'Percent' && (
            <div className={styles.control}>
              <p>Code</p>
              <Input
                placeholder="Code"
                value={coupon.code}
                updateValue={updateInputForm('code')}
                className={styles.amountInput}
              />
            </div>
          )}
          <div className={styles.horizon}>
            <div className={styles.control}>
              <p>Start Date</p>
              <Input
                type="date"
                value={coupon.date.from}
                updateValue={updateInputForm('date.from')}
              />
            </div>
            <div className={styles.control}>
              <p>End Date</p>
              <Input
                type="date"
                value={coupon.date.to}
                updateValue={updateInputForm('date.to')}
              />
            </div>
          </div>
          {coupon.type === 'Free Shipping' && (
            <>
              <div className={styles.control}>
                <p>Coupon Use</p>
                <RadioGroup
                  value={coupon.usage?.type}
                  updateValue={updateStrForm('usage.type')}
                >
                  <Radio label="Use Code" value="Use Code" />
                  <Radio label="Amount Spent" value="Amount Spent" />
                </RadioGroup>
              </div>
              <div className={styles.control}>
                <p>
                  {coupon.usage?.type === 'Use Code'
                    ? 'Code'
                    : 'Amount needed to spend'}
                </p>
                <Input
                  placeholder={
                    coupon.usage?.type === 'Use Code' ? 'Code' : 'Amount Spent'
                  }
                  value={
                    coupon.usage?.type === 'Use Code'
                      ? coupon.usage?.code
                      : coupon.usage?.amount
                  }
                  updateValue={updateInputForm(
                    coupon.usage?.type === 'Use Code'
                      ? 'usage.code'
                      : 'usage.amount',
                  )}
                  className={styles.amountInput}
                  adornment={{
                    position: 'left',
                    content: '$',
                  }}
                />
              </div>
            </>
          )}
          {coupon.type === 'Percent' && (
            <div className={styles.control}>
              <p>Discount %</p>
              <Input
                placeholder="Discount"
                value={coupon.discount}
                updateValue={updateInputForm('discount')}
                className={styles.amountInput}
                adornment={{
                  position: 'left',
                  content: '%',
                }}
              />
            </div>
          )}
          {coupon.type === 'Tiered' && (
            <div className={styles.tiered}>
              {coupon.conditions?.map((condition: any, index: number) => (
                <div className={styles.horizon}>
                  <div className={styles.control}>
                    {index === 0 && <p>Discount</p>}
                    <Input
                      placeholder="Discount"
                      value={condition.discount}
                      updateValue={updateCondition('discount', index)}
                      className={styles.amountInput}
                      adornment={{
                        position: 'left',
                        content: '%',
                      }}
                    />
                  </div>
                  <div className={styles.control}>
                    {index === 0 && <p>Minimum Spend</p>}
                    <Input
                      placeholder="Minimum Spend"
                      value={condition.minimum}
                      updateValue={updateCondition('minimum', index)}
                      className={styles.amountInput}
                      adornment={{
                        position: 'left',
                        content: '$',
                      }}
                    />
                  </div>
                  <div className={styles.control}>
                    {index === 0 && <p>Maximum Spend</p>}
                    <Input
                      placeholder="Minimum Spend"
                      value={condition.maximum}
                      updateValue={updateCondition('maximum', index)}
                      className={styles.amountInput}
                      adornment={{
                        position: 'left',
                        content: '$',
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className={styles.tieredButton}>
                <button onClick={onConditionAddClick}>Add +</button>
              </div>
            </div>
          )}
          <div className={styles.control}>
            <p>Who's it for?</p>
            <RadioGroup
              value={coupon.target?.type}
              updateValue={updateStrForm('target.type')}
            >
              <Radio label="Global Coupon" value="Global Coupon" />
              <Radio label="Product Specific" value="Product Specific" />
              {coupon.type !== 'Tiered' && (
                <Radio label="Customer Specific" value="Customer Specific" />
              )}
            </RadioGroup>
          </div>
          {coupon.target?.type !== 'Global Coupon' && (
            <div className={styles.control}>
              <p>
                {coupon.target?.type === 'Customer Specific'
                  ? 'Customers'
                  : 'Products'}
              </p>
              <div className={styles.dataTable}>
                <Input
                  placeholder={`Search for a ${
                    coupon.target?.type === 'Customer Specific'
                      ? 'customer'
                      : 'product'
                  }`}
                  size="large"
                  adornment={{
                    position: 'right',
                    content: <MagnifierIcon />,
                  }}
                  rounded="full"
                  className={styles.searchInput}
                />
                <RadioGroup value="">
                  <TableBody
                    columns={
                      coupon.target?.type === 'Customer Specific'
                        ? customerColumns
                        : productColumns
                    }
                    rows={
                      coupon.target?.type === 'Customer Specific'
                        ? initialCustomers
                        : initialProducts
                    }
                  />
                </RadioGroup>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttonBar}>
        <button
          className={styles.cancelButton}
          onClick={() => navigate(homePath)}
        >
          Cancel
        </button>
        <button className={styles.addButton} onClick={onAddBtnClick}>
          {couponId === 'create' ? 'Add' : 'Update'}
        </button>
      </div>
    </Card>
  );
}
