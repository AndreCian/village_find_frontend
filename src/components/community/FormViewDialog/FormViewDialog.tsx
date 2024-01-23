import { PrintIcon, ExportIcon } from '@/components/icons';

import { formatUsDate } from '@/utils';

import { IAttendee } from '@/pages/community';

import styles from './FormViewDialog.module.scss';

interface IFormViewDialogProps {
  open: boolean;
  onClose: () => void;
  form: IAttendee;
}

const initialForms = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Height',
    key: 'height',
    value: (object: any) =>
      object.height ? `${object.height.min}-${object.height.max}` : '',
  },
  {
    title: 'Weight',
    key: 'weight',
  },
  {
    title: 'Attending',
    key: 'isAttend',
    value: (object: any) => `${object.isAttend ? 'Yes' : 'No'}`,
  },
];

export function FormViewDialog({ open, onClose, form }: IFormViewDialogProps) {
  if (!form) return;

  return (
    open &&
    form && (
      <div className={styles.root}>
        <div className={styles.panel}>
          <div className={styles.actions}>
            <button>
              <p>Print</p>
              <span>
                <PrintIcon />
              </span>
            </button>
            <button>
              <p>Export</p>
              <span>
                <ExportIcon />
              </span>
            </button>
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1>Submitted Form</h1>
              <div className={styles.text}>
                <p>
                  <span>Submitted By:</span> {form.name}
                </p>
                <p>
                  <span>Date Submitted:</span>{' '}
                  {formatUsDate(new Date(form.date))}
                </p>
              </div>
            </div>
            <div className={styles.form}>
              {initialForms.map((item: any, index: number) => (
                <div key={index} className={styles.control}>
                  <p className={styles.label}>{item.title}</p>
                  <div className={styles.horizon}>
                    <div className={styles.gridIcon}>
                      {Array(6)
                        .fill('')
                        .map((_: string, index: number) => (
                          <span key={index} />
                        ))}
                    </div>
                    <div className={styles.input}>
                      {item.value ? item.value(form) : (form as any)[item.key]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <span className={styles.closeButton} onClick={onClose}>
            &times;
          </span>
        </div>
      </div>
    )
  );
}
