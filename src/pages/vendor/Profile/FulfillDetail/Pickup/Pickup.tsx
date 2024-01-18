import clsx from 'clsx';

import { Input, Radio, RadioGroup } from '@/components/forms';

import { IPickupInfo, useFulfillStore } from '@/stores';

import styles from './Pickup.module.scss';
import { WeekdayType } from '@/interfaces';
import { TimeInput } from '@/components/forms/TimeInput/TimeInput';

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
  const { pickup, setPickupDay } = useFulfillStore();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.control}>
          <p>
            Lead Time <span>(In Hours)</span>
          </p>
          <Input
            placeholder="Lead Time"
            rounded="full"
            border="none"
            bgcolor="secondary"
            disabled={true}
            className={styles.timeInput}
          />
        </div>
        <RadioGroup
          value={pickup.day}
          updateValue={(value: string) => setPickupDay(value as WeekdayType)}
        >
          <div className={styles.timeRanges}>
            {weekdays.map((day: string) => (
              <div
                key={day}
                className={clsx(
                  styles.row,
                  day === pickup.day ? styles.active : '',
                )}
              >
                <div className={styles.weekday}>
                  <Radio label={day} value={day} />
                </div>
                <div className={styles.ranges}>
                  <div className={styles.range}>
                    <span>Starting Time</span>
                    <TimeInput
                      value={pickup.range.start}
                      active={day === pickup.day}
                    />
                  </div>
                  <div className={styles.range}>
                    <span>Ending Time</span>
                    <TimeInput
                      value={pickup.range.end}
                      active={day === pickup.day}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
