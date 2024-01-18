import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import clsx from 'clsx';

import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@/components/forms';

import { useOnClickOutside } from '@/utils';

import styles from './ProductDialog.module.scss';

interface IProductDialogProps {
  open: boolean;
  onClose?: () => void;
}

const initialSortOptions = ['Sort Alphabetically, A-Z'];

export function ProductDialog({
  open,
  onClose = () => {},
}: IProductDialogProps) {
  const [ansCount, setAnsCount] = useState(0);
  const [ansIndex, setAnsIndex] = useState('0');
  const [answers, setAnswers] = useState<string[]>(['', '']);
  const dialogRef = useRef<HTMLDivElement>(null);

  const onAnswerChange = (index: number) => (e: any) => {
    setAnswers(
      answers.map((answer: string, _index: number) =>
        index === _index ? e.target.value : answer,
      ),
    );
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
          <div className={styles.mainForm}>
            <div className={styles.prompt}>
              <p className={styles.text}>Enter prompt for content generation</p>
              <TextField
                rows={5}
                rounded="full"
                className={styles.promptInput}
                placeholder="Write a caption about growing a business using social media"
              />
            </div>
            <div className={styles.elements}>
              <div className={styles.element}>
                <p className={styles.title}>Select tone</p>
                <Select placeholder="Default" className={styles.toneSelector} />
              </div>
              <div className={styles.element}>
                <p className={styles.title}>Generated Count</p>
                <Input type="number" className={styles.countInput} />
              </div>
            </div>
            <Button className={styles.submitBtn}>Submit</Button>
          </div>
          <div className={styles.answers}>
            <div className={styles.header}>
              <p className={styles.title}>Select One</p>
              <Button className={styles.regenBtn}>Regenerate</Button>
            </div>
            <div className={styles.body}>
              <RadioGroup
                value={ansIndex}
                updateValue={(value: string) => setAnsIndex(value)}
                className={styles.answerList}
              >
                {answers.map((answer: string, index: number) => (
                  <div key={index} className={styles.answer}>
                    <Radio value={index.toString()} />
                    <Input
                      value={answer}
                      updateValue={onAnswerChange(index)}
                      className={styles.ansInput}
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <Button className={styles.chooseBtn}>Select</Button>
        </div>
        <span className={styles.closeBtn} onClick={onClose}>
          <FaTimes size={24} />
        </span>
      </div>
    </div>
  );
}
