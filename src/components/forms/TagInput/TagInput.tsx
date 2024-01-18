import { FaX } from 'react-icons/fa6';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import clsx from 'clsx';

import styles from './TagInput.module.scss';

export interface ITagInput {
  options?: string[];
  className?: string;
  label?: string;
}

export function TagInput({
  options = [],
  className = '',
  label = 'Select...',
}: ITagInput) {
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>(options);

  const onClose = (name: string) => {
    setTags(
      tags.filter((tag: string, index: number) => name !== `${tag}-${index}`),
    );
  };

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setTags([...tags, text]);
      setText('');
    }
  };

  return (
    <div className={clsx(styles.root, className)}>
      {tags.length ? (
        tags.map((tag: string, index: number) => (
          <p key={`${tag}-${index}`}>
            {tag}
            <span>
              <FaX
                fill="white"
                size={'8px'}
                onClick={() => onClose(`${tag}-${index}`)}
              />
            </span>
          </p>
        ))
      ) : (
        <span>{label}</span>
      )}
      <input value={text} onChange={onTextChange} onKeyDown={onKeyDown} />
    </div>
  );
}
