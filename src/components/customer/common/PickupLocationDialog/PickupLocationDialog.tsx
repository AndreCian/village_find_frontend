import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import clsx from 'clsx';

import { Button, Radio, RadioGroup } from '@/components/forms';

import { useOnClickOutside } from '@/utils';

import styles from './PickupLocationDialog.module.scss';

interface IPickupLocationDialogProps {
  open: boolean;
  onClose?: () => void;
  onUpdate?: (pickup: any) => void;
}

const initialLocations = [
  {
    name: "George's Gym",
    location: '313 Capitol Avenue Waterbury, Ct 06704',
  },
  {
    name: "George's Gym",
    location: '313 Capitol Avenue Waterbury, Ct 06704',
  },
  {
    name: "George's Gym",
    location: '313 Capitol Avenue Waterbury, Ct 06704',
  },
];

const initialPickTime = [
  {
    date: new Date('02/27/2023'),
    time: '4pm - 5pm',
  },
  {
    date: new Date('02/27/2023'),
    time: '4pm - 5pm',
  },
  {
    date: new Date('02/27/2023'),
    time: '4pm - 5pm',
  },
  {
    date: new Date('02/27/2023'),
    time: '4pm - 5pm',
  },
];

export function PickupLocationDialog({
  open,
  onClose = () => {},
  onUpdate = () => {},
}: IPickupLocationDialogProps) {
  const [isLocPanel, setIsLocPanel] = useState(true);
  const [locIndex, setLocIndex] = useState('0');
  const [dateIndex, setDateIndex] = useState('0');
  const dialogRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const onUpdateClick = () => {
    // onUpdate();
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  useEffect(() => {
    if (dialogRef.current === null) return;
    useOnClickOutside(dialogRef, onClose, 'mousedown');
  }, []);

  return (
    <div className={clsx(styles.root, !open ? styles.hide : '')}>
      <div className={styles.container} ref={dialogRef}>
        <div className={styles.content}>
          <div className={styles.head}>
            <p className={styles.title}>
              {`Choose Your Pickup ${isLocPanel ? 'Location' : 'Date'}`}
            </p>
            <p className={styles.text}>
              {isLocPanel
                ? 'Select a pickup location for your order'
                : 'Select the date you want to pickup your order'}
            </p>
          </div>
          <div className={styles.body}>
            {isLocPanel ? (
              <RadioGroup
                value={locIndex}
                updateValue={(index: string) => setLocIndex(index)}
                className={styles.locPanel}
              >
                {initialLocations.map((location: any, index: number) => (
                  <div
                    key={index}
                    className={clsx(styles.location, {
                      [styles.active]: locIndex === index.toString(),
                    })}
                    onClick={() => setLocIndex(index.toString())}
                  >
                    <div className={styles.text}>
                      <p className={styles.name}>{location.name}</p>
                      <p className={styles.position}>{location.location}</p>
                    </div>
                    <Radio value={index.toString()} />
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className={styles.datePanel}>
                <div className={styles.location}>
                  <div className={styles.text}>
                    <p className={styles.name}>
                      {initialLocations[Number(locIndex)].name}
                    </p>
                    <p className={styles.position}>
                      {initialLocations[Number(locIndex)].location}
                    </p>
                  </div>
                </div>
                <RadioGroup
                  value={dateIndex}
                  updateValue={(index: string) => setDateIndex(index)}
                  className={styles.timePanel}
                >
                  {initialPickTime.map((dateTime: any, index: number) => (
                    <div
                      className={clsx(styles.timeCell, {
                        [styles.active]: dateIndex === index.toString(),
                      })}
                      onClick={() => setDateIndex(index.toString())}
                    >
                      <div className={styles.pickupdate} key={index}>
                        <div className={styles.element}>
                          <p className={styles.title}>Pickup date</p>
                          <p className={styles.text}>
                            {formatDate(dateTime.date)}
                          </p>
                        </div>
                        <div className={styles.element}>
                          <p className={styles.title}>Pickup Between</p>
                          <p className={styles.text}>{dateTime.time}</p>
                        </div>
                      </div>
                      <Radio
                        value={index.toString()}
                        className={styles.radio}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          {isLocPanel ? (
            <Button
              className={clsx(styles.button, styles.nextBtn)}
              onClick={() => setIsLocPanel(false)}
            >
              Next
            </Button>
          ) : (
            <>
              <Button
                className={clsx(styles.button, styles.backBtn)}
                onClick={() => setIsLocPanel(true)}
              >
                Back
              </Button>
              <Button
                className={clsx(styles.button, styles.updateBtn)}
                onClick={onUpdateClick}
              >
                Update
              </Button>
            </>
          )}
        </div>
        <span className={styles.closeBtn} onClick={onClose}>
          <FaTimes size={24} />
        </span>
      </div>
    </div>
  );
}
