import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { InputPiece } from './InputPiece';

import styles from './TimeInput.module.scss';

export interface ITimeInputProps {
  value?: string;
  active?: boolean;
}

export function TimeInput({ value = '', active = false }: ITimeInputProps) {
  const [inIndex, setInIndex] = useState(-1);
  const [pieces, setPieces] = useState<string[]>([]);

  useEffect(() => {
    const colonStrs = value.split(':');
    const emptyPieces = Array(6).fill('');
    if (colonStrs.length !== 2) {
      setPieces(emptyPieces);
      return;
    }
    const spaceStrs = colonStrs[1].split(' ');
    if (spaceStrs.length !== 2) {
      setPieces(emptyPieces);
      return;
    }
    const hourStr = colonStrs[0],
      minStr = spaceStrs[0],
      apmStr = spaceStrs[1];
    if (
      Number(hourStr) >= 0 &&
      Number(hourStr) <= 12 &&
      hourStr.length === 2 &&
      Number(minStr) >= 0 &&
      Number(minStr) <= 12 &&
      minStr.length === 2 &&
      (apmStr === 'AM' || apmStr === 'PM')
    ) {
      setPieces([
        ...hourStr.split(''),
        ...minStr.split(''),
        ...apmStr.split(''),
      ]);
    } else {
      setPieces(emptyPieces);
    }
  }, [value]);

  return (
    <div className={clsx(styles.root, styles.active)}>
      {pieces.map((piece: string, index: number) => (
        <>
          <InputPiece
            key={`${piece}-${index}`}
            value={piece}
            className={clsx(
              index === 3 ? styles.minute : '',
              active ? styles.active : '',
            )}
            focused={inIndex === index}
            onFocus={() => setInIndex(index)}
          />
          {index === 1 && <span className={styles.colon}>:</span>}
        </>
      ))}
    </div>
  );
}
