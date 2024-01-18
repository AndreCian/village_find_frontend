import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import clsx from 'clsx';

import { Button } from '@/components/forms';

import { useOnClickOutside } from '@/utils';

import styles from './PickDateDialog.module.scss';

const initialMonthLabels = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const initialWeekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface IPickDateDialogProps {
  open: boolean;
  onUpdate?: (date: Date) => void;
  onClose?: () => void;
  dates?: Date[];
}

export function PickDateDialog({
  open,
  dates = [],
  onUpdate = () => {},
  onClose = () => {},
}: IPickDateDialogProps) {
  const [currentDate, setCurDate] = useState<Date>(new Date());
  const dialogRef = useRef<HTMLDivElement>(null);

  const onDateChange = () => {
    onUpdate(currentDate);
    onClose();
  };

  const isDaySame = (day1: Date, day2: Date) => {
    return (
      day1.getFullYear() === day2.getFullYear() &&
      day1.getMonth() === day2.getMonth() &&
      day1.getDate() === day2.getDate()
    );
  };

  const getDayList = (date: Date) => {
    const dayList = [];
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let iterator = firstDayOfMonth;
    if (iterator.getDay()) {
      while (true) {
        if (!iterator.getDay()) break;
        iterator.setDate(iterator.getDate() - 1);
      }
    }

    iterator = lastDayOfMonth;
    if (iterator.getDay() !== 6) {
      while (true) {
        if (iterator.getDay() === 6) break;
        iterator.setDate(iterator.getDate() + 1);
      }
    }
    iterator.setDate(iterator.getDate() + 1);

    iterator = new Date(firstDayOfMonth);
    while (!isDaySame(iterator, lastDayOfMonth)) {
      dayList.push(iterator);
      iterator = new Date(
        iterator.getFullYear(),
        iterator.getMonth(),
        iterator.getDate() + 1,
      );
    }

    return dayList;
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
          <p className={styles.title}>Choose a fulfillment date</p>
          <div className={styles.calendar}>
            <p className={styles.yearMonth}>
              {initialMonthLabels[currentDate.getMonth()]}{' '}
              {currentDate.getFullYear()}
            </p>
            <div className={styles.body}>
              <div className={styles.weekdays}>
                {initialWeekdayLabels.map((weekday: string, index: number) => (
                  <div key={index} className={styles.weekday}>
                    {weekday}
                  </div>
                ))}
              </div>
              <div className={styles.days}>
                {getDayList(currentDate).map((day: Date, index: number) => (
                  <div
                    key={index}
                    className={clsx(
                      styles.day,
                      isDaySame(day, new Date())
                        ? styles.today
                        : isDaySame(day, currentDate)
                        ? styles.currentDay
                        : !!dates.find(available => isDaySame(day, available))
                        ? styles.availableDay
                        : '',
                    )}
                    onClick={() => setCurDate(day)}
                  >
                    {day.getDate()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.labels}>
          <div className={clsx(styles.label, styles.available)}>
            <span />
            <p>Available Days</p>
          </div>
          <div className={clsx(styles.label, styles.current)}>
            <span />
            <p>Current Day</p>
          </div>
          <div className={clsx(styles.label, styles.selected)}>
            <span />
            <p>Selected Day</p>
          </div>
        </div>
        <Button className={styles.updateBtn} onClick={onDateChange}>
          Update
        </Button>
        <span className={styles.closeBtn} onClick={onClose}>
          <FaTimes size={24} />
        </span>
      </div>
    </div>
  );
}
