import { useState, useEffect, useRef } from 'react';
import { enqueueSnackbar } from 'notistack';
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

import { HttpService } from '@/services';

import { useOnClickOutside } from '@/utils';

import styles from './AIDialog.module.scss';

interface IAIDialogProps {
  open: boolean;
  onClose?: () => void;
  category: string;
  topic:
    | 'product name'
    | 'short product description'
    | 'long product description'
    | 'disclaimer';
}

const initialTones = [
  'Default',
  'Celebratory',
  'Empathetic',
  'Excited',
  'Formal',
  'Funny',
  'Witty',
];

export function AIDialog({
  open,
  onClose = () => {},
  topic,
  category,
}: IAIDialogProps) {
  const [ansCount, setAnsCount] = useState(0);
  const [ansIndex, setAnsIndex] = useState(-1);
  const [ansTone, setAnsTone] = useState('Default');
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState<string[]>(Array(ansCount).fill(''));
  const dialogRef = useRef<HTMLDivElement>(null);

  const onAnswerChange = (index: number) => (e: any) => {
    setAnswers(
      answers.map((answer: string, _index: number) =>
        index === _index ? e.target.value : answer,
      ),
    );
  };

  const onCountChange = (e: any) => {
    setAnsCount(Number(e.target.value));
  };

  const onRegenClick = () => {
    setAnswers(Array(ansCount).fill(''));
  };

  const onSubmitClick = () => {
    HttpService.get(
      `/openai?count=${ansCount}&tone=${ansTone}&type=${topic}&category=${category}&prompt=${prompt}`,
    ).then(response => {
      const { status, answers } = response;
      if (status === 200) {
        console.log(answers);
      } else {
        enqueueSnackbar('Something went wrong with server.', {
          variant: 'error',
        });
      }
    });
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
                value={prompt}
                updateValue={(e: any) => setPrompt(e.target.value)}
              />
            </div>
            <div className={styles.elements}>
              <div className={styles.element}>
                <p className={styles.title}>Select tone</p>
                <Select
                  placeholder="Default"
                  className={styles.toneSelector}
                  options={initialTones}
                  value={ansTone}
                  updateValue={(tone: string) => setAnsTone(tone)}
                />
              </div>
              <div className={styles.element}>
                <p className={styles.title}>Generated Count</p>
                <Input
                  type="number"
                  name="count"
                  className={styles.countInput}
                  value={ansCount}
                  updateValue={onCountChange}
                />
              </div>
            </div>
            <Button className={styles.submitBtn} onClick={onSubmitClick}>
              Submit
            </Button>
          </div>
          <div className={styles.answers}>
            <div className={styles.header}>
              <p className={styles.title}>Select One</p>
              <Button className={styles.regenBtn} onClick={onRegenClick}>
                Regenerate
              </Button>
            </div>
            <div className={styles.body}>
              <RadioGroup
                value={ansIndex.toString()}
                updateValue={(value: string) => setAnsIndex(Number(value))}
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
