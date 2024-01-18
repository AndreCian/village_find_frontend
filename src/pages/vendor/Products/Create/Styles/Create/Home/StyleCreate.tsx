import { useMemo } from 'react';
import { FaChevronRight } from 'react-icons/fa6';

import { Card } from '@/components/common';
import { Input } from '@/components/forms';

import { useStyleStore } from '@/stores';

import styles from './StyleCreate.module.scss';

export function StyleCreate() {
  const id = '1';
  const { styles: proStyles } = useStyleStore();
  const curStyle = useMemo(() => {
    return (
      proStyles.find((style: any) => style.id === id) || {
        attribute: {
          size: [],
          color: [],
        },
      }
    );
  }, [proStyles]);

  return (
    <Card className={styles.root}>
      <div className={styles.container}>
        <div className={styles.thumbnail}>
          <p>My Products</p>
          <FaChevronRight className={styles.arrow} />
          <span>Product Styles</span>
        </div>
        <div className={styles.variant}>
          <p>
            <span>Products Name:</span> Black Polish Radish
          </p>
        </div>
        <div className={styles.addAttr}>
          <div className={styles.control}>
            <p>Style Name</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Beeded"
            />
          </div>
          <button className={styles.button}>New Attribute</button>
        </div>
        <div className={styles.form}>
          <div className={styles.control}>
            <p>Attribute Name</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Size"
              disabled={true}
              className={styles.attrNameInput}
            />
          </div>
          <div className={styles.control}>
            <p>Attribute Values</p>
            <div className={styles.sizeBar}>
              {curStyle.attribute.size.map((size: string) => (
                <span key={size}>{size}</span>
              ))}
              <button className={styles.addButton}>
                Add Sizes<span>+</span>
              </button>
            </div>
          </div>
          <div className={styles.control}>
            <p>Attribute Name</p>
            <Input
              rounded="full"
              border="none"
              bgcolor="secondary"
              placeholder="Color"
              disabled={true}
              className={styles.attrNameInput}
            />
          </div>
          <div className={styles.control}>
            <p>Attribute Values</p>
            <div className={styles.colorBar}>
              {curStyle.attribute.color.map((color: string) => (
                <span key={color}>{color}</span>
              ))}
              <button className={styles.addButton}>
                Add<span>+</span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.buttonBar}>
          <button className={styles.button}>Next</button>
        </div>
      </div>
    </Card>
  );
}
