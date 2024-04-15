import { useEffect, useState } from 'react';
import clsx from 'clsx';
import _ from 'lodash';

import { Input, Radio, RadioGroup } from '@/components/forms';
import { ChangeInputEvent } from '@/interfaces';

import styles from './Pickup.module.scss';
import { HttpService } from '@/services';
import { enqueueSnackbar } from 'notistack';

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function Pickup() {
  const [leadTime, setLeadTime] = useState<number>(0);
  const [pickDays, setPickDays] = useState<number[]>([]);
  const [pickTimes, setPickTimes] = useState<{ from: string; to: string }[]>(
    Array(weekdays.length).fill({ from: '', to: '' }),
  );

  const onPickDayChange = (value: string) => {
    if (pickDays.includes(Number(value))) {
      setPickDays(pickDays.filter(item => item.toString() !== value));
    } else {
      setPickDays([...pickDays, Number(value)]);
    }
  };

  const onPickTimeChange =
    (index: number, pos: 'from' | 'to') => (e: ChangeInputEvent) => {
      setPickTimes(
        pickTimes.map((time: any, id: number) =>
          id === index ? { ...time, [pos]: e.target.value } : time,
        ),
      );
    };

  const onUpdateBtnClick = () => {
    HttpService.put('/user/vendor/profile/fulfillment/pickup', {
      leadTime,
      pickupDays: pickDays.map(weekday => ({ ...pickTimes[weekday], weekday })),
    }).then(response => {
      const { status } = response;
      if (status === 200) {
        enqueueSnackbar('Pickup days updated.', { variant: 'success' });
      }
    });
  };

  useEffect(() => {
    HttpService.get('/user/vendor/profile/fulfillment/pickup').then(
      (response: any) => {
        console.log(response);
        const { leadTime, days } = response;
        const allowDays = (days || []).map((item: any) => item.weekday);
        setLeadTime(leadTime);
        setPickDays(allowDays);
        setPickTimes(
          pickTimes.map((item: any, index: number) =>
            allowDays.includes(index)
              ? _.pick(
                  days.find((item: any) => item.weekday === index),
                  ['from', 'to'],
                )
              : _.pick(item, ['from', 'to']),
          ),
        );
      },
    );
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.control}>
          <p>
            Lead Time <span>(In Hours)</span>
          </p>
          <Input
            type="number"
            placeholder="Lead Time"
            rounded="full"
            border="none"
            bgcolor="secondary"
            className={styles.timeInput}
            value={leadTime}
            updateValue={(e: ChangeInputEvent) =>
              setLeadTime(Number(e.target.value))
            }
          />
        </div>
        <RadioGroup
          multiple={true}
          value={pickDays.map(item => item.toString())}
          updateValue={onPickDayChange}
        >
          <div className={styles.timeRanges}>
            {weekdays.map((day: string, index: number) => (
              <div
                key={day}
                className={clsx(
                  styles.row,
                  pickDays.includes(index) ? styles.active : '',
                )}
              >
                <div className={styles.weekday}>
                  <Radio label={day} value={index.toString()} />
                </div>
                <div className={styles.ranges}>
                  <div className={styles.range}>
                    <span>Starting Time</span>
                    <Input
                      type="time"
                      className={clsx(styles.timepicker, {
                        [styles.active]: pickDays.includes(index),
                      })}
                      value={
                        pickDays.includes(index) ? pickTimes[index].from : ''
                      }
                      updateValue={
                        pickDays.includes(index)
                          ? onPickTimeChange(index, 'from')
                          : () => {}
                      }
                    />
                  </div>
                  <div className={styles.range}>
                    <span>Ending Time</span>
                    <Input
                      type="time"
                      className={clsx(styles.timepicker, {
                        [styles.active]: pickDays.includes(index),
                      })}
                      value={
                        pickDays.includes(index) ? pickTimes[index].to : ''
                      }
                      updateValue={
                        pickDays.includes(index)
                          ? onPickTimeChange(index, 'to')
                          : () => {}
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
        <div className={styles.buttonBar}>
          <button onClick={onUpdateBtnClick}>Update</button>
        </div>
      </div>
    </div>
  );
}
